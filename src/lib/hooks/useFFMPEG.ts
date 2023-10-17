"use client";
import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export interface VideoText {
  text: string;
  x: number;
  y: number;
}

function getTextArgs(texts: VideoText[]) {
  const textArgs = texts.map((text) => {
    return `drawtext=text='${text.text}':fontfile=/arial.ttf:fontsize=36:fontcolor=white:x=(w-text_w)/2:y=${text.y}`;
  });

  return textArgs.join(",");
}

export function useFFMPEG(videoUrl: string) {
  const ffmpegRef = useRef(new FFmpeg());
  const [texts, setTexts] = useState<VideoText[]>([]);

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
    let args = ["-i", "input.mp4"];

    if (texts.length > 0) {
      await ffmpeg.writeFile(
        "arial.ttf",
        await fetchFile(
          "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/arial.ttf"
        )
      );
      args.push("-vf");
      args.push(getTextArgs(texts));
    }

    args.push("output.gif");

    console.log("Executing ffmpeg with", args);
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile("output.gif");
    return data;
  };
  useEffect(() => {
    console.log("load ffmpeg");
    load();
  }, []);

  return { transcode, texts, setTexts };
}
