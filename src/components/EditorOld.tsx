"use client";

import { useEffect, useState } from "react";
import { VideoGeneration } from "./VideoGeneration";
import { Videos } from "@/lib/xata";

const Editor = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  const videoFilePoll = async () => {
    if (!videoId) return;

    const resp = await fetch(`/api/video/${videoId}`);

    if (resp.status != 200) {
      const message = await resp.text();
      console.error(message);
      return;
    }

    const videoRecord = (await resp.json()) as Videos;

    if (!videoRecord.video?.signedUrl) {
      setTimeout(videoFilePoll, 1000);
      return;
    }

    setVideo(videoRecord.video.signedUrl);
  };

  const createVideo = async (prompt: string) => {
    const resp = await fetch("/api/video", {
      method: "POST",
      body: JSON.stringify({
        prompt,
      }),
    });

    if (resp.status != 200) {
      const message = await resp.text();
      console.error(message);
      return;
    }

    const videoRecord = (await resp.json()) as Videos;

    setVideoId(videoRecord.id);
  };

  useEffect(() => {
    videoFilePoll();
  }, [videoId]);

  if (videoId && video) {
    return (
      <div>
        <video src={video} loop={true} autoPlay={true} />
      </div>
    );
  }

  if (videoId && !video) {
    return <div>Generating video...</div>;
  }

  return (
    <>
      <VideoGeneration onSubmit={createVideo} />
    </>
  );
};

export { Editor };
