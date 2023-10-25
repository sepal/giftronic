import { Videos } from "@/lib/xata";
import { canGenerateVideo } from "@/server/data/user";
import { requestVideoGeneration } from "@/server/data/video";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export interface CreateVideoBody {
  prompt: string;
}

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Not authorized",
      },
      {
        status: 401,
      }
    );
  }

  if (!canGenerateVideo(userId)) {
    return NextResponse.json(
      {
        error: "No credits left",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body = (await req.json()) as CreateVideoBody;
    const { prompt } = body;

    const record = await requestVideoGeneration(userId, prompt);

    return NextResponse.json(record);
  } catch (e) {
    console.error(e);
    return new Response("Server error", {
      status: 500,
    });
  }
}
