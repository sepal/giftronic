"use client";

import { Memes, Videos } from "@/lib/xata";
import { useEffect, useState } from "react";
import { VideoPrompt } from "./VideoPrompt";
import { Button, buttonVariants } from "../ui/button";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJune } from "@/lib/hooks/useJune";

enum State {
  EMPTY_VIDEO,
  GENERATE_VIDEO,
  EDIT_TEXT,
}

interface Props {
  defaultCredits?: number;
  defaultMeme?: Memes;
}

function getDefaultState(meme?: Memes) {
  if (meme?.video?.video?.signedUrl) return State.EDIT_TEXT;
  return State.EMPTY_VIDEO;
}

const Editor = ({ defaultCredits, defaultMeme = undefined }: Props) => {
  const [prompt, setPrompt] = useState<string>(
    defaultMeme?.video?.prompt || ""
  );

  const [state, setState] = useState<State>(getDefaultState(defaultMeme));
  const [meme, setMeme] = useState<Memes | undefined>(defaultMeme);
  const { loadFile, transcode, texts, setTexts } = useFFMPEG(
    defaultMeme?.videoText || []
  );
  const [credits, setCredits] = useState<number | undefined>(defaultCredits);
  const router = useRouter();
  const analytics = useJune();

  const getCredits = async () => {
    const resp = await fetch("/api/user");
    if (resp.status >= 300) {
      console.log("Logged out");
      setCredits(0);
    } else {
      const user = await resp.json();
      setCredits(user.credits);
    }
  };

  useEffect(() => {
    getCredits();
  }, [meme, state]);

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
    <>
      <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
        Back to the front
      </Link>
      {credits && credits > 0 ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            const text = prompt.trim();
            if (text.length <= 3) return;
            analytics?.track("Generate Video");
            generateVideo();
          }}
        >
          Generate Video
        </Button>
      ) : (
        <Link
          href={"/buy-credits"}
          className={buttonVariants({ variant: "default" })}
        >
          Request more credits
        </Link>
      )}
    </>
  );

  let preview = <VideoPrompt onPromptChange={(prompt) => setPrompt(prompt)} />;

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
              analytics?.track("Retry generating Video");
            }}
          >
            Retry generating video
          </Button>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await generateGif();
              await analytics?.track("Save meme");
              router.push(`/meme/${meme?.id}`);
            }}
          >
            Save Meme
          </Button>
        </>
      );
      break;
  }

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <p>Credits left: {credits || "0"}</p>
      <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
        {preview}
      </div>
      <ActionWrapper>{actions}</ActionWrapper>
    </div>
  );
};

export { Editor };
