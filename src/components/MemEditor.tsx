import { Videos } from "@/lib/xata";

interface Props {
  video: Videos;
}

const MemeEditor = ({ video }: Props) => {
  return (
    <div>
      <video src={video.video?.signedUrl} loop={true} autoPlay={true} />
    </div>
  );
};

export { MemeEditor };
