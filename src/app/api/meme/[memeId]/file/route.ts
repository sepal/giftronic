import { updateMeme } from "@/server/data/meme";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    memeId: string;
  };
};

export async function POST(req: NextRequest, { params }: Params) {
  const { memeId } = params;

  if (!memeId) {
    return NextResponse.json(
      {
        error: "Meme not found",
      },
      {
        status: 404,
      }
    );
  }

  const data = await req.formData();
  const file = data.get("file");
  const isFile = typeof file == "object";

  if (!file || !isFile)
    return NextResponse.json(
      { error: "Invalid file type submitted" },
      {
        status: 422,
      }
    );
  const blob = file as Blob;

  const meme = await updateMeme(memeId, {
    gif: blob,
  });

  return NextResponse.json(meme?.toSerializable());
}
