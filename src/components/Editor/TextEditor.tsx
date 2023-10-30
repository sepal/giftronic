"use client";

import { VideoText } from "@/lib/hooks/useFFMPEG";
import { MemeTextInput } from "../ui/memeTextInput";
import { useRef, useState } from "react";

interface Props {
  onTextChange: (texts: VideoText[]) => void;
  defaultText?: VideoText[];
}

const TextEditor = ({ onTextChange, defaultText = undefined }: Props) => {
  const [texts, setTexts] = useState<VideoText[]>(
    defaultText || [
      { text: "", x: 0, y: 46 },
      { text: "", x: 0, y: 312 },
    ]
  );

  return (
    <div className="relative w-full z-10 h-full grid grid-rows-3 grid-flow-col gap-4 items-center text-white text-3xl text-center">
      <div className="bg-opacity-25 bg-black">
        <MemeTextInput
          defaultText={defaultText ? defaultText[0]?.text : ""}
          placeholder="Top text"
          onChange={(text) => {
            const newTexts = [...texts];
            newTexts[0].text = text;

            setTexts(newTexts);
            onTextChange(newTexts);
          }}
        />
      </div>
      <div></div>
      <div className="bg-opacity-25 bg-black">
        <MemeTextInput
          defaultText={defaultText ? defaultText[1]?.text : ""}
          placeholder="Bottom text"
          onChange={(text) => {
            const newTexts = [...texts];
            newTexts[1].text = text;
            setTexts(newTexts);
            onTextChange(newTexts);
          }}
        />
      </div>
    </div>
  );
};

export { TextEditor };
