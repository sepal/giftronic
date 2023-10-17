import { MemesRecord } from "@/lib/xata";
import { MemeInput, createMeme } from "@/server/data/meme";
import { EditableData } from "@xata.io/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as MemeInput;

  try {
    const record = await createMeme(body);
    return NextResponse.json(record.toSerializable());
  } catch (error) {
    console.error(error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
