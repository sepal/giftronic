import { randomInt } from "@/lib/math";
import { getReplicateClient } from "@/lib/replicate";
import { getBaseUrl } from "@/lib/url";
import { getXataClient } from "@/lib/xata";

export enum Scheduler {
  EulerAncestralDiscreteScheduler = "EulerAncestralDiscreteScheduler",
  EulerDiscreteScheduler = "EulerDiscreteScheduler",
}

export interface VideoGenerationOptions {
  negativePrompt?: string;
  scheduler?: Scheduler;
  steps?: number;
  mp4?: boolean;
  seed?: number;
}

const defaultOptions: VideoGenerationOptions = {
  negativePrompt: "blurry",
  scheduler: Scheduler.EulerAncestralDiscreteScheduler,
  steps: 30,
  mp4: true,
  seed: 0,
};

export async function requestVideoGeneration(
  prompt: string,
  options?: VideoGenerationOptions
) {
  const replicate = getReplicateClient();
  const xata = getXataClient();

  const generationSettings = { ...defaultOptions, seed: randomInt(), options };

  const videoRecord = await xata.db.Videos.create({
    prompt,
    generationSettings,
  });

  const prediction = await replicate.predictions.create({
    version: "b57dddff6ae2029be57eab3d17e0de5f1c83b822f0defd8ce49bee44d7b52ee6",
    input: {
      prompt: prompt,
      ...generationSettings,
    },
    webhook: getBaseUrl() + `/api/video/${videoRecord.id}/generation`,
    webhook_events_filter: ["completed"],
  });

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
