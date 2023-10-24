import React, { ReactNode } from "react";
import { Skeleton } from "./skeleton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import Link from "next/link";

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
}

const MemePreview = ({ text, src }: MemePreviewProps) => (
  <Image src={src} width={MAX_WIDTH} height={MAX_HEIGHT} alt={text} />
);

const MemeCTA = () => (
  <div
    className={cn(
      `w-[${MAX_WIDTH}px]`,
      `h-[${MAX_HEIGHT}px]`,
      "rounded-none bg-muted text-black flex justify-center items-center p-2"
    )}
  >
    <Link className={buttonVariants({ variant: "default" })} href={"/generate"}>
      Create your own
    </Link>
  </div>
);

export { MemeGrid, MemeSkeleton, MemePreview, MemeCTA };
