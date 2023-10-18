"use client";

import { Memes, Videos } from "@/lib/xata";
import { useState } from "react";
import { VideoPrompt } from "./VideoPrompt";
import { Button } from "../ui/button";
import { VideoSkeleton } from "./VideoSkeleton";
import { TextEditor } from "./TextEditor";

enum State {
  EMPTY_VIDEO,
  GENERATE_VIDEO,
  EDIT_TEXT,
}

const Editor = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [state, setState] = useState<State>(State.EMPTY_VIDEO);
  const [video, setVideo] = useState<Videos | null>(null);
  const [meme, setMeme] = useState<Memes | null>(null);

  const generateVideo = async () => {
    console.log("Generate video");
    setState(State.GENERATE_VIDEO);
  };

  const EditorChild = ({ state }: { state: State }) => {
    console.log(state);
    switch (state) {
      case State.EDIT_TEXT:
        return (
          <>
            <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
              <div className="absolute">
                <video
                  src="http://localhost:3000/api/video/rec_ckm42di5s2eofh7lirrg/file"
                  loop
                  autoPlay
                />
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

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <EditorChild state={state} />
    </div>
  );
};

export { Editor };
