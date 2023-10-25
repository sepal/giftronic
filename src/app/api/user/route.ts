import { getUser } from "@/server/data/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await getUser(userId);

  return NextResponse.json(user);
}
