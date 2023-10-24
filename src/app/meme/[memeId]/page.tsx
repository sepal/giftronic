import { Header } from "@/components/layouts/Header";
import { Meme } from "@/components/ui/Memes";
import { getMeme } from "@/lib/clients";
import { notFound } from "next/navigation";

export default async function EditMeme({
  params,
}: {
  params: { memeId: string };
}) {
  const { memeId } = params;
  const meme = await getMeme(memeId);

  if (!meme?.file?.url || !meme?.text) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-4 dark:bg-slate-800 dark:text-white">
        <Meme src={meme.file.url} text={meme.text} />
      </main>
    </>
  );
}
