"use client";

import { Videos } from "@/lib/xata";
import { MemeTextInput } from "./ui/memeTextInput";

interface Props {
  video: Videos;
}

const MemeEditor = ({ video }: Props) => {
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
          <MemeTextInput onChange={(text) => console.log(text)} />
        </div>
        <div></div>
        <div>
          <MemeTextInput onChange={(text) => console.log(text)} />
        </div>
      </div>
    </div>
  );
};

export { MemeEditor };
