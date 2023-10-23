import { Editor } from "@/components/Editor";
import { getMeme } from "@/lib/clients";
import { notFound } from "next/navigation";

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
      <Editor defaultMeme={meme} />
    </main>
  );
}
