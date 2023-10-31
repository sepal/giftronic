import { getMeme } from "@/server/data/meme";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { memeId: string };
  }
) {
  const { memeId } = params;
  const meme = await getMeme(memeId);

  if (!meme?.file?.signedUrl || !meme?.text) {
    notFound();
  }

  const response = await fetch(meme.file.signedUrl);
  return new NextResponse(response.body);
}
