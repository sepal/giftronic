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
    const video = await getVideo(videoId);
    if (!video) {
      return NextResponse.json(
        {
          error: "Not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
