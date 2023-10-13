import { VideoGeneration } from "@/components/VideoGeneration";

export default async function Generate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <VideoGeneration />
    </main>
  );
}
