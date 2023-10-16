"use client";
import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export function useFFMPEG(videoUrl: string) {
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    console.log("FFmpeg should be loaded");
  };

  // const loadFile = async () => {
  //   const ffmpeg = ffmpegRef.current;
  //   console.log("Load file", videoUrl);
  //   const inputFile = await fetchFile(videoUrl);
  //   await ffmpeg.writeFile("input.mp4", inputFile);
  //   console.log("File written to ffmpeg");
  // };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const inputFile = await fetchFile(videoUrl);
    await ffmpeg.writeFile("input.mp4", inputFile);
    console.log("transcoding", videoUrl);
    await ffmpeg.exec(["-i", "input.mp4", "output.gif"]);
    const data = await ffmpeg.readFile("output.gif");
    return data;
  };
  useEffect(() => {
    console.log("load ffmpeg");
    load();
  }, []);

  return [transcode];
}
