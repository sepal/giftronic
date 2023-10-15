import { addVideo } from "@/server/data/video";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    videoId: string;
  };
};

export async function POST(req: NextRequest, { params }: Params) {
  const { videoId } = params;

  if (!videoId) {
    return NextResponse.json(
      {
        error: "No video id passed",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const resp = await req.json();

    if (resp.status != "succeeded") {
      return NextResponse.json(
        {
          error: "Generation didn't succeed",
        },
        {
          status: 400,
        }
      );
    }

    const { output } = resp;
    const fileResp = await fetch(output);
    const blob = await fileResp.blob();
    const video = await addVideo(videoId, blob);

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
