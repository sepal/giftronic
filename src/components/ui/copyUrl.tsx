"use client";

import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import { Button, buttonVariants } from "./button";
import { Input } from "./input";
import { useRef, useState } from "react";

interface Props {
  url: string;
}

const CopyUrl = ({ url }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = () => {
    if (!inputRef.current) return;
    navigator.clipboard.writeText(inputRef.current.value);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1000);
  };
  return (
    <div className="flex gap-4">
      <Input type="text" value={url} ref={inputRef} />
      <Button variant="secondary" size="icon" onClick={handleCopyClick}>
        {!copySuccess ? (
          <ClipboardDocumentIcon
            className="h-4 animate-in"
            aria-label="Copy url to clipboard"
          />
        ) : (
          <ClipboardDocumentCheckIcon
            className="h-4 animate-bounce-rev"
            aria-label="Url copied"
          />
        )}
      </Button>
      <a
        className={buttonVariants({ variant: "secondary", size: "icon" })}
        aria-label="Download"
        href={url}
        target="_blank"
        download="meme.gif"
      >
        <ArrowDownTrayIcon className="h-4" />
      </a>
    </div>
  );
};

export { CopyUrl };
