import { Videos } from "@/lib/xata";
import { requestVideoGeneration } from "@/server/data/video";
import { NextRequest, NextResponse } from "next/server";

export interface CreateVideoBody {
  prompt: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateVideoBody;
    const { prompt } = body;

    const record = await requestVideoGeneration(prompt);

    return NextResponse.json(record);
  } catch (e) {
    console.error(e);
    return new Response("Server error", {
      status: 500,
    });
  }
}
