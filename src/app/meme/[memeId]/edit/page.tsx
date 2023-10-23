import { Editor, EditorSkeleton } from "@/components/Editor";
import { getMeme } from "@/lib/clients";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function EditMeme({
  params,
}: {
  params: { memeId: string };
}) {
  const { memeId } = params;
  const meme = await getMeme(memeId);

  if (!meme) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Suspense fallback={<EditorSkeleton />}>
        <Editor defaultMeme={meme} />
      </Suspense>
    </main>
  );
}
