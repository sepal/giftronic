import { MemeInput, getMeme, updateMeme } from "@/server/data/meme";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    memeId: string;
  };
};

export async function PUT(req: NextRequest, { params }: Params) {
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

  const body = (await req.json()) as MemeInput;

  try {
    const meme = await updateMeme(memeId, body);
    if (!meme) {
      return NextResponse.json(
        {
          error: "Meme not found",
        },
        {
          status: 404,
        }
      );
    }
    return meme.toSerializable();
  } catch (error) {
    console.error(error);
    return new Response("Server error", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, { params }: Params) {
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

  const meme = await getMeme(memeId);

  if (!meme) {
    return NextResponse.json(
      {
        error: "Meme not found",
      },
      {
        status: 404,
      }
    );
  }
  return meme.toSerializable();
}
