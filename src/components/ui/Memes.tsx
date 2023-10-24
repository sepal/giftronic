import React, { ReactNode } from "react";
import { Skeleton } from "./skeleton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import Link from "next/link";
import { ActionWrapper } from "../Editor/Elements";

const MAX_WIDTH = 400;
const MAX_HEIGHT = Math.round(MAX_WIDTH / 1.72);

interface MemeGridProps {
  children: ReactNode;
}

const MemeGrid = ({ children }: MemeGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {children}
  </div>
);

const MemeSkeleton = ({ children }: { children?: ReactNode }) => (
  <Skeleton
    className={cn(`w-[${MAX_WIDTH}px]`, `h-[${MAX_HEIGHT}px]`, "rounded-none")}
  >
    {children}
  </Skeleton>
);

interface MemePreviewProps {
  text: string;
  src: string;
  url: string;
}

const MemePreview = ({ text, src, url }: MemePreviewProps) => (
  <Link href={url} className="hover:shadow-lg">
    <Image src={src} width={MAX_WIDTH} height={MAX_HEIGHT} alt={text} />
  </Link>
);

const MemeCTA = () => (
  <div
    className={cn(
      `w-[${MAX_WIDTH}px]`,
      `h-[${MAX_HEIGHT}px]`,
      "rounded-none bg-muted text-black flex justify-center items-center p-2 hover:shadow-lg"
    )}
  >
    <Link className={buttonVariants({ variant: "default" })} href={"/generate"}>
      Create your own
    </Link>
  </div>
);

interface MemeProps {
  text: string;
  src: string;
}

const Meme = ({ text, src }: MemeProps) => (
  <div className="flex flex-col gap-4">
    <Image src={src} width={"672"} height={"384"} alt={text} />
    <ActionWrapper>
      <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
        Back to the front
      </Link>
    </ActionWrapper>
  </div>
);

export { MemeGrid, MemeSkeleton, MemePreview, MemeCTA, Meme };
