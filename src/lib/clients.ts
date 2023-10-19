import { MemeInput } from "@/server/data/meme";
import { Memes, Videos } from "./xata";

export async function createVideo(prompt: string) {
  const resp = await fetch("/api/video", {
    method: "POST",
    body: JSON.stringify({
      prompt,
    }),
  });

  if (resp.status != 200) {
    const message = await resp.text();
    console.error(message);
    return;
  }

  const videoRecord = (await resp.json()) as Videos;

  return videoRecord;
}

export async function videoAvailable(videoId: string) {
  const resp = await fetch(`/api/video/${videoId}`);

  if (resp.status != 200) {
    const message = await resp.text();
    console.error(message);
    return;
  }

  const videoRecord = (await resp.json()) as Videos;
  console.log(videoRecord);

  if (!videoRecord.video?.signedUrl) {
    return false;
  }

  return true;
}

export async function createMeme(data?: MemeInput) {
  const resp = await fetch("/api/meme", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (resp.status != 200) {
    console.error(await resp.text());
    return;
  }

  const meme = (await resp.json()) as Memes;
  return meme;
}

export async function updateMeme(memeId: string, data: MemeInput) {
  if (data.gif) {
    const formData = new FormData();
    formData.set("file", data.gif as File);
    const resp = await fetch(`/api/meme/${memeId}/file`, {
      method: "POST",
      body: formData,
    });

    delete data.gif;
  }

  const resp = await fetch(`/api/meme/${memeId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (resp.status != 200) {
    console.error(await resp.text());
    return;
  }

  const meme = (await resp.json()) as Memes;
  return meme;
}

export async function getMeme(memeId: string) {
  const resp = await fetch(`/api/meme/${memeId}`);
  if (resp.status != 200) {
    console.error(await resp.text());
    return;
  }

  const meme = (await resp.json()) as Memes;
  return meme;
}
