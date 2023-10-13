"use client";

import { MouseEvent } from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FilmIcon } from "@heroicons/react/24/outline";

interface Props {
  onSubmit: (prompt: string) => void;
}

const VideoGeneration = ({ onSubmit }: Props) => {
  const [prompt, setPrompt] = useState<string | null>(
    "A dancing cartoon polar bear"
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!prompt) return;
    onSubmit(prompt);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p>Describe the meme you want to generate including the style.</p>
      <div className="h-64 flex flex-col items-center justify-center p-4 rounded-md border-slate-300 border-2  ">
        <FilmIcon className="h-20 text-slate-300" />
        <Input
          className=""
          type="text"
          placeholder="A dancing cartoon polar bear dancing..."
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <Button variant="default" onClick={handleClick}>
        Generate
      </Button>
    </div>
  );
};

export { VideoGeneration };
