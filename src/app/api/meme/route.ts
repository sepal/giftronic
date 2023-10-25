import { MemesRecord } from "@/lib/xata";
import { MemeInput, createMeme } from "@/server/data/meme";
import { auth } from "@clerk/nextjs";
import { EditableData } from "@xata.io/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as MemeInput;

  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  try {
    const record = await createMeme(userId, body);
    return NextResponse.json(record.toSerializable());
  } catch (error) {
    console.error(error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
