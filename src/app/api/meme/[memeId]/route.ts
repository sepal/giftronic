import { MemeInput, getMeme, updateMeme } from "@/server/data/meme";
import { canEditMeme } from "@/server/data/user";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    memeId: string;
  };
};

export async function PUT(req: NextRequest, { params }: Params) {
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

  const body = (await req.json()) as MemeInput;

  if (!canEditMeme(userId, memeId)) {
    return NextResponse.json({ error: "No access" }, { status: 403 });
  }

  try {
    const meme = await updateMeme(userId, memeId, body);
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
    return NextResponse.json(meme);
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
  return NextResponse.json(meme);
}
