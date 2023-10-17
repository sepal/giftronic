"use client";

import { Memes, Videos } from "@/lib/xata";
import { MemeTextInput } from "./ui/memeTextInput";
import { useEffect, useState } from "react";
import { useFFMPEG } from "@/lib/hooks/useFFMPEG";
import { Button } from "./ui/button";

interface Props {
  video: Videos;
}

const MemeEditor = ({ video }: Props) => {
  const [topText, setTopText] = useState<string | null>(null);
  const [bottomText, setBottomText] = useState<string | null>(null);
  const [gif, setGif] = useState<string | null>(null);

  const { transcode, texts, setTexts } = useFFMPEG(
    `/api/video/${video.id}/file`
  );

  const handleSave = async () => {
    const gifFile = await transcode();
    const url = URL.createObjectURL(new Blob([gifFile], { type: "image/gif" }));
    console.log(url);
    setGif(url);

    const cResp = await fetch("/api/meme", {
      method: "POST",
      body: JSON.stringify({
        videoId: video.id,
        texts: texts,
      }),
    });

    if (cResp.status != 200) {
      console.error(await cResp.text());
      return;
    }
    let meme = (await cResp.json()) as Memes;

    const formData = new FormData();

    const blob = new Blob([gifFile], {
      type: "image/gif",
    });

    formData.set("file", blob);
    const uResp = fetch(`/api/meme/${meme.id}/file`, {
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    setTexts([
      { text: "", x: 0, y: 46 },
      { text: "", x: 0, y: 312 },
    ]);
  }, []);

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
          <MemeTextInput
            onChange={(text) => {
              const newTexts = texts;
              newTexts[0].text = text;
              setTexts(newTexts);
            }}
          />
        </div>
        <div></div>
        <div>
          <MemeTextInput
            onChange={(text) => {
              const newTexts = texts;
              newTexts[1].text = text;
              setTexts(newTexts);
            }}
          />
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
