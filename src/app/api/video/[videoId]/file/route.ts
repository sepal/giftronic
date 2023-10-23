import { updateMeme } from "@/lib/clients";
import { getXataClient } from "@/lib/xata";
import { getVideo } from "@/server/data/video";
import { NextResponse } from "next/server";

type Params = {
  params: {
    videoId: string;
  };
};

export async function GET(req: Request, { params }: Params) {
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
    const xata = getXataClient();
    const video = await getVideo(videoId);

    if (!video || !video?.video?.signedUrl) {
      return NextResponse.json(
        {
          error: "Video not found",
        },
        {
          status: 404,
        }
      );
    }

    const response = await fetch(video.video.signedUrl);
    return new NextResponse(response.body);
  } catch (error) {
    console.error(error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
