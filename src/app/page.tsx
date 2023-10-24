import { getXataClient } from "@/lib/xata";
import {
  MemeCTA,
  MemeGrid,
  MemePreview,
  MemeSkeleton,
} from "@/components/ui/Memes";
import { Suspense } from "react";
import { Header } from "@/components/layouts/Header";

const MEMES_PER_PAGE_COUNT = 12;

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const pageNumber = parseInt(searchParams.page) || 1;

  const xata = getXataClient();
  const memes = await xata.db.Memes.filter({
    $exists: "file",
  })
    .sort("xata.updatedAt")
    .getPaginated({
      pagination: {
        size: MEMES_PER_PAGE_COUNT,
        offset: MEMES_PER_PAGE_COUNT * pageNumber - MEMES_PER_PAGE_COUNT,
      },
    });

  const skeletons = Array.from({ length: 12 }, () => <MemeSkeleton />);

  const memeChilds = memes.records.map((meme) => (
    <MemePreview
      src={meme.file!.url}
      text={meme.text || ""}
      url={`/meme/${meme.id}`}
    />
  ));

  return (
    <>
      <Header />
      <main className="justify-between p-4 dark:bg-slate-800 dark:text-white">
        <h1 className="text-2xl py-4">Latest memes:</h1>
        <MemeGrid>
          <Suspense fallback={skeletons}>{memeChilds}</Suspense>
          <MemeCTA />
        </MemeGrid>
      </main>
    </>
  );
}
