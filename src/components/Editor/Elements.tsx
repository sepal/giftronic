import { FC, FunctionComponent, ReactNode } from "react";

interface ActionWrapperProps {
  children: ReactNode;
}

const ActionWrapper = ({ children }: ActionWrapperProps) => (
  <div className="flex flex-row justify-around gap-2">{children}</div>
);

interface VideoPreviewProps {
  src?: string;
}

const VideoPreview = ({ src }: VideoPreviewProps) => (
  <div className="absolute">
    <video src={src} loop autoPlay />
  </div>
);

export { ActionWrapper, VideoPreview };
