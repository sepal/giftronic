"use client";

import { VideoText } from "@/lib/hooks/useFFMPEG";
import { MemeTextInput } from "../ui/memeTextInput";
import { useRef } from "react";

interface Props {
  onTextChange: (texts: VideoText[]) => void;
}

const TextEditor = ({ onTextChange }: Props) => {
  const topText = useRef<string>("");
  const bottomText = useRef<string>("");
  const handleTextChange = () => {
    const texts = [
      { text: topText.current, x: 0, y: 46 },
      { text: bottomText.current, x: 0, y: 312 },
    ];
    console.log(texts.map((item) => item.text).join("\n"));
    onTextChange(texts);
  };

  return (
    <div className="relative w-full z-10 h-full grid grid-rows-3 grid-flow-col gap-4 items-center ">
      <div className="">
        <MemeTextInput
          defaultText="Top text"
          onChange={(text) => {
            topText.current = text;
            handleTextChange();
          }}
        />
      </div>
      <div></div>
      <div>
        <MemeTextInput
          defaultText="bottom text"
          onChange={(text) => {
            bottomText.current = text;
            handleTextChange();
          }}
        />
      </div>
    </div>
  );
};

export { TextEditor };
