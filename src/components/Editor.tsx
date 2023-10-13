"use client";

import { VideoGeneration } from "./VideoGeneration";

const Editor = () => {
  const createVideo = async (prompt: string) => {
    console.log(prompt);
  };

  return (
    <>
      <VideoGeneration onSubmit={createVideo} />
    </>
  );
};

export { Editor };
