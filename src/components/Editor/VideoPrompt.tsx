"use client";

import { FilmIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";

interface Prop {
  onPromptChange: (prompt: string) => void;
}

const VideoPrompt = ({ onPromptChange }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-md border-slate-300 border-2 w-full h-full">
      <FilmIcon className="h-20 text-slate-300" />
      <Input
        className=""
        type="text"
        placeholder="A dancing cartoon polar bear dancing..."
        onChange={(e) => {
          e.preventDefault();

          onPromptChange(e.target.value);
        }}
      />
    </div>
  );
};

export { VideoPrompt };
