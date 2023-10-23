"use client";

import { VideoText } from "@/lib/hooks/useFFMPEG";
import { MemeTextInput } from "../ui/memeTextInput";
import { useRef } from "react";

interface Props {
  onTextChange: (texts: VideoText[]) => void;
  defaultText?: VideoText[];
}

const TextEditor = ({ onTextChange, defaultText = [] }: Props) => {
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
          defaultText={defaultText[0]?.text || "Top text"}
          onChange={(text) => {
            topText.current = text;
            handleTextChange();
          }}
        />
      </div>
      <div></div>
      <div>
        <MemeTextInput
          defaultText={defaultText[1]?.text || "Top text"}
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
