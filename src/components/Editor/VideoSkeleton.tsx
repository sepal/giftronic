"use client";

import { cn } from "@/lib/utils";
import { FilmIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

interface Props {
  className?: string;
  text?: string;
}

const VideoSkeleton = ({
  className = "",
  text = "Generating your video",
}: Props) => {
  const classes = cn([
    "w-full h-full flex flex-col items-center justify-center text-slate-300 p-4 rounded-md border-slate-300 border-2",
    className,
  ]);
  return (
    <div className={classes}>
      <FilmIcon className="h-10 animate-bounce" />
      {text}
    </div>
  );
};

export { VideoSkeleton };
