import { VideoText } from "@/lib/hooks/useFFMPEG";
import { Memes, MemesRecord, getXataClient } from "@/lib/xata";
import { EditableData } from "@xata.io/client";

export type MemeInput = {
  videoId?: string;
  texts?: VideoText[];
  gif?: Blob;
};

export async function createMeme(input?: MemeInput) {
  const xata = getXataClient();

  const { videoId, texts, gif } = input ?? {};

  let args: Omit<EditableData<MemesRecord>, "id"> = {
    video: videoId!,
  };

  if (texts && texts.length > 1) {
    args["videoText"] = texts;
    args["text"] = texts.map((item) => item.text).join("\n");
  }

  if (gif) {
    const file = await gif
      .arrayBuffer()
      .then((buffer) => Buffer.from(buffer).toString("base64"));

    args["file"] = {
      name: "meme.gif",
      base64Content: file,
      mediaType: gif.type,
    };
  }

  const record = await xata.db.Memes.create(args);
  return record;
}

export async function updateMeme(
  id: string,
  { videoId, texts, gif }: MemeInput
) {
  const xata = getXataClient();
  let args: Partial<EditableData<MemesRecord>> = {
    video: videoId!,
  };

  if (texts && texts.length > 1) {
    args["videoText"] = texts;
    args["text"] = texts.map((item) => item.text).join("\n");
  }
  if (gif) {
    const file = await gif
      .arrayBuffer()
      .then((buffer) => Buffer.from(buffer).toString("base64"));

    args["file"] = {
      name: "meme.gif",
      base64Content: file,
      mediaType: gif.type,
    };
  }

  const record = await xata.db.Memes.update(id, args);
  return record;
}

export async function getMeme(id: string) {
  const xata = getXataClient();
  const meme = await xata.db.Memes.read(id, [
    "*",
    "file.*",
    "file.signedUrl",
    "video.*",
    "video.video.*",
    "video.video.signedUrl",
  ]);
  return meme;
}
