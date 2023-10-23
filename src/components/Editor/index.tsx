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

enum State {
  EMPTY_VIDEO,
  GENERATE_VIDEO,
  EDIT_TEXT,
}

interface Props {
  defaultMeme?: Memes;
}

const Editor = ({ defaultMeme = undefined }: Props) => {
  console.log(defaultMeme);
  const [prompt, setPrompt] = useState<string>(
    defaultMeme?.video?.prompt || ""
  );
  const [state, setState] = useState<State>(
    defaultMeme ? State.EDIT_TEXT : State.EMPTY_VIDEO
  );
  const [meme, setMeme] = useState<Memes | undefined>(defaultMeme);
  const { loadFile, transcode, texts, setTexts } = useFFMPEG(
    defaultMeme?.videoText || []
  );

  console.log(meme?.video?.video?.signedUrl);

  const videoFilePoll = async (meme: Memes) => {
    if (!meme?.video?.id) return;
    const hasVideo = await videoAvailable(meme.video.id);
    console.log(hasVideo);

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
      console.log(meme);
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

  const getChildEditor = () => {
    switch (state) {
      case State.EDIT_TEXT:
        return (
          <>
            <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
              <div className="absolute">
                <video src={meme?.video?.video?.signedUrl} loop autoPlay />
              </div>
              <TextEditor
                onTextChange={(text) => setTexts(text)}
                defaultText={meme?.videoText}
              />
            </div>
            <div className="flex flex-row justify-around gap-2">
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
                onClick={(e) => {
                  e.preventDefault();
                  generateGif();
                }}
              >
                Create Meme
              </Button>
            </div>
          </>
        );
      case State.GENERATE_VIDEO:
        return (
          <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
            <VideoSkeleton className="absolute" />
            <TextEditor onTextChange={(text) => setTexts(text)} />
          </div>
        );
      default:
        return (
          <>
            <div className="w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
              <VideoPrompt onPromptChange={(prompt) => setPrompt(prompt)} />
            </div>
            <Button
              className="max-w-xl m-auto"
              onClick={(e) => {
                e.preventDefault();
                generateVideo();
              }}
            >
              Generate Video
            </Button>
          </>
        );
    }
  };

  return <div className="flex flex-col gap-4 mx-auto">{getChildEditor()}</div>;
};

export { Editor };
