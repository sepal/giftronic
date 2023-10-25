import { updateMeme } from "@/server/data/meme";
import { canEditMeme } from "@/server/data/user";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    memeId: string;
  };
};

export async function POST(req: NextRequest, { params }: Params) {
  const { memeId } = params;

  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

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

  if (!canEditMeme(userId, memeId)) {
    return NextResponse.json({ error: "No access" }, { status: 403 });
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

  const meme = await updateMeme(userId, memeId, {
    gif: blob,
  });

  return NextResponse.json(meme?.toSerializable());
}
