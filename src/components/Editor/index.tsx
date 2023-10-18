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
  videoAvailable,
} from "@/lib/clients";

enum State {
  EMPTY_VIDEO,
  GENERATE_VIDEO,
  EDIT_TEXT,
}

const Editor = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [state, setState] = useState<State>(State.EMPTY_VIDEO);
  const [meme, setMeme] = useState<Memes | null>(null);

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
    const meme = await createMeme({ videoId: video?.id });
    console.log(meme);
    if (!video?.id || !meme?.id) {
      console.error("Error creating meme or video");
      return;
    }
    setMeme(meme);
    videoFilePoll(meme);
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
              <TextEditor />
            </div>
            <div className="flex flex-row justify-around gap-2">
              <Button variant="secondary" onClick={(e) => {}}>
                Retry generating video
              </Button>
              <Button onClick={(e) => {}}>Create Meme</Button>
            </div>
          </>
        );
      case State.GENERATE_VIDEO:
        return (
          <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
            <VideoSkeleton className="absolute" />
            <TextEditor />
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
