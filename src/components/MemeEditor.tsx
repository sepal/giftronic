import { Videos } from "@/lib/xata";
import { Input } from "./ui/input";

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
        <div className="text-4xl text-center text-white shadow">Top text</div>
        <div></div>
        <div className="text-4xl text-center">Bottom text</div>
      </div>
    </div>
  );
};

export { MemeEditor };
