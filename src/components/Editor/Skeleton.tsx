import { Skeleton } from "../ui/skeleton";
import { VideoSkeleton } from "./VideoSkeleton";

const EditorSkeleton = () => (
  <div className="flex flex-col gap-4 mx-auto">
    <div className="relative w-[300px] h-[160px] md:w-[672px] md:h-[384px]">
      <VideoSkeleton className="absolute" text="Loading meme" />
      <div className="relative w-full z-10 h-full grid grid-rows-3 grid-flow-col gap-4 items-center p-1">
        <Skeleton className="w-full h-10 " />
        <div></div>
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  </div>
);

export { EditorSkeleton };
