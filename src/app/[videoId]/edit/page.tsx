import { MemeEditor } from "@/components/MemeEditor";
import { getVideo } from "@/server/data/video";

export default async function Edit({
  params,
}: {
  params: { videoId: string };
}) {
  const { videoId } = params;
  const video = await getVideo(videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <MemeEditor video={video} />
    </main>
  );
}
