import { Editor, EditorSkeleton } from "@/components/Editor";
import { Header } from "@/components/layouts/Header";
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
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-4 dark:bg-slate-800 dark:text-white">
        <Suspense fallback={<EditorSkeleton />}>
          <Editor defaultMeme={meme} />
        </Suspense>
      </main>
    </>
  );
}
