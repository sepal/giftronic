"use client";

import { Videos } from "@/lib/xata";
import { MemeTextInput } from "./ui/memeTextInput";
import { useState } from "react";
import { useFFMPEG } from "@/lib/hooks/useFFMPEG";
import { Button } from "./ui/button";
import { getBaseUrl } from "@/lib/url";

interface Props {
  video: Videos;
}

const MemeEditor = ({ video }: Props) => {
  const [topText, setTopText] = useState<string | null>(null);
  const [bottomText, setBottomText] = useState<string | null>(null);
  const [gif, setGif] = useState<string | null>(null);

  const [transcode] = useFFMPEG(`/api/video/${video.id}/file`);

  const handleSave = async () => {
    const gifFile = await transcode();
    const url = URL.createObjectURL(new Blob([gifFile], { type: "image/gif" }));
    console.log(url);
    setGif(url);
  };

  return (
    <div className="relative w-[672px] h-[384px] mx-auto">
      <div className="absolute top-0 ">
        <video
          className=""
          src={video.video?.signedUrl}
          loop={true}
          autoPlay={true}
        />
      </div>
      <div className="relative z-10 h-full grid grid-rows-3 grid-flow-col gap-4 items-center ">
        <div className="">
          <MemeTextInput onChange={(text) => setTopText} />
        </div>
        <div></div>
        <div>
          <MemeTextInput onChange={(text) => setBottomText} />
        </div>
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        Save
      </Button>

      {gif && <img src={gif} />}
    </div>
  );
};

export { MemeEditor };
