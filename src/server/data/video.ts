import { randomInt } from "@/lib/math";
import { getReplicateClient } from "@/lib/replicate";
import { getBaseUrl } from "@/lib/url";
import { getXataClient } from "@/lib/xata";
import { UserOutOfCreditsError, canGenerateVideo, deductCredits } from "./user";

export enum Scheduler {
  DDIMScheduler = "DDIMScheduler",
  DPMSolverMultistepScheduler = "DPMSolverMultistepScheduler",
  HeunDiscreteScheduler = "HeunDiscreteScheduler",
  KarrasDPM = "KarrasDPM",
  EulerAncestralDiscreteScheduler = "EulerAncestralDiscreteScheduler",
  EulerDiscreteScheduler = "EulerDiscreteScheduler",
  PNDMScheduler = "PNDMScheduler",
}

export interface VideoGenerationOptions {
  negativePrompt?: string;
  scheduler?: Scheduler;
  steps?: number;
  mp4?: boolean;
  seed?: number;
  width?: number;
  height?: number;
}

const defaultOptions: VideoGenerationOptions = {
  negativePrompt: "blurry",
  scheduler: Scheduler.EulerAncestralDiscreteScheduler,
  steps: 30,
  mp4: true,
  seed: 0,
  width: 672,
  height: 384,
};

export async function requestVideoGeneration(
  userId: string,
  prompt: string,
  options?: VideoGenerationOptions
) {
  const replicate = getReplicateClient();
  const xata = getXataClient();

  const canGenerate = await canGenerateVideo(userId);

  if (!canGenerate) {
    throw new UserOutOfCreditsError(userId);
  }

  const generationSettings = { ...defaultOptions, seed: randomInt(), options };

  const videoRecord = await xata.db.Videos.create({
    prompt,
    author: userId,
    generationSettings,
  });

  const prediction = await replicate.predictions.create({
    version: "78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a",
    input: {
      prompt: prompt,
      ...generationSettings,
    },
    webhook: getBaseUrl() + `/api/video/${videoRecord.id}/generation`,
    webhook_events_filter: ["completed"],
  });

  console.log("Requested generating video:", prediction);

  return videoRecord;
}

export async function addVideo(id: string, videoBlob: Blob) {
  const xata = getXataClient();

  const file = await videoBlob
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  const record = await xata.db.Videos.updateOrThrow(id, {
    video: {
      name: "meme.mp4",
      base64Content: file,
      mediaType: videoBlob.type,
    },
  });

  if (record?.author) {
    await deductCredits(record.author.id, 1);
  }

  return record;
}

export async function getVideo(id: string) {
  const xata = getXataClient();
  return xata.db.Videos.read(id, [
    "*",
    "video.name",
    "video.mediaType",
    "video.signedUrl",
  ]);
}
