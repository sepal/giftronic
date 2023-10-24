"use client";

import { Memes, Videos } from "@/lib/xata";
import { useState } from "react";
import { VideoPrompt } from "./VideoPrompt";
import { Button } from "../ui/button";
import { VideoSkeleton } from "./VideoSkeleton";
import { TextEditor } from "./TextEditor";
import {
  createMeme,
  createVideo,
  getMeme,
  updateMeme,
  videoAvailable,
} from "@/lib/clients";
import { useFFMPEG } from "@/lib/hooks/useFFMPEG";
import { ActionWrapper, VideoPreview } from "./Elements";

enum State {
  EMPTY_VIDEO,
  GENERATE_VIDEO,
  EDIT_TEXT,
  PREVIEW,
}

interface Props {
  defaultMeme?: Memes;
}

function getDefaultState(meme?: Memes) {
  if (meme?.file?.signedUrl) return State.PREVIEW;
  if (meme?.video?.video?.signedUrl) return State.EDIT_TEXT;
  return State.EMPTY_VIDEO;
}

const Editor = ({ defaultMeme = undefined }: Props) => {
  const [prompt, setPrompt] = useState<string>(
    defaultMeme?.video?.prompt || ""
  );

  const [state, setState] = useState<State>(getDefaultState(defaultMeme));
  const [meme, setMeme] = useState<Memes | undefined>(defaultMeme);
  const { loadFile, transcode, texts, setTexts } = useFFMPEG(
    defaultMeme?.videoText || []
  );

  const videoFilePoll = async (meme: Memes) => {
    if (!meme?.video?.id) return;
    const hasVideo = await videoAvailable(meme.video.id);

    if (!hasVideo) {
      setTimeout(() => {
        videoFilePoll(meme);
      }, 500);
      return;
    }

    const newMeme = (await getMeme(meme.id)) as Memes;
    setMeme(newMeme);
    setState(State.EDIT_TEXT);
  };

  const generateVideo = async () => {
    console.log("Generate video");
    setState(State.GENERATE_VIDEO);
    const video = await createVideo(prompt);
    let newMeme: Memes | undefined;
    if (!meme) {
      newMeme = await createMeme({ videoId: video?.id });
    } else {
      newMeme = await updateMeme(meme.id, {
        videoId: video?.id,
      });
    }
    if (!video?.id || !newMeme?.id) {
      console.error("Error creating meme or video");
      return;
    }
    setMeme(newMeme);
    videoFilePoll(newMeme);
  };

  const generateGif = async () => {
    if (!meme || !meme.video?.id) return;
    await loadFile(`/api/video/${meme.video.id}/file`);
    const gifFile = await transcode();
    const url = URL.createObjectURL(new Blob([gifFile], { type: "image/gif" }));
    const blob = new Blob([gifFile], {
      type: "image/gif",
    });

    const newMeme = await updateMeme(meme?.id, {
      gif: blob,
      texts: texts,
    });

    if (!newMeme) return;

    setMeme(newMeme);
  };

  let actions = (
    <Button
      className="max-w-xl m-auto"
      onClick={(e) => {
        e.preventDefault();
        generateVideo();
      }}
    >
      Generate Video
    </Button>
  );

  let preview = (
    <>
      <VideoSkeleton className="absolute" />
      <TextEditor onTextChange={(text) => setTexts(text)} />
    </>
  );

  switch (state) {
    case State.GENERATE_VIDEO:
      preview = (
        <>
          <VideoSkeleton className="absolute" />
          <TextEditor onTextChange={(text) => setTexts(text)} />
        </>
      );
      actions = <></>;
      break;
    case State.EDIT_TEXT:
      preview = (
        <>
          <VideoPreview src={meme?.video?.video?.signedUrl} />
          <TextEditor
            onTextChange={(text) => setTexts(text)}
            defaultText={meme?.videoText}
          />
        </>
      );
      actions = (
        <>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              generateVideo();
            }}
          >
            Retry generating video
          </Button>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await generateGif();
              setState(State.PREVIEW);
            }}
          >
            Save Meme
          </Button>
        </>
      );
      break;
    case State.PREVIEW:
      preview = <img src={meme?.file?.url} />;
      actions = (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setState(State.EDIT_TEXT);
          }}
        >
          Edit Meme
        </Button>
      );
      break;
  }

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
        {preview}
      </div>
      <ActionWrapper>{actions}</ActionWrapper>
    </div>
  );
};

export { Editor };
