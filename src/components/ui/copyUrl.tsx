"use client";

import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { Button } from "./button";
import { Input } from "./input";
import { useRef, useState } from "react";

interface Props {
  url: string;
}

const CopyUrl = ({ url }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopyClick = () => {
    if (!inputRef.current) return;
    navigator.clipboard.writeText(inputRef.current.value);

    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 1000);
  };
  return (
    <div className="flex gap-4">
      <Input type="text" value={url} ref={inputRef} />
      <Button variant="secondary" size="icon" onClick={handleCopyClick}>
        {!showSuccess ? (
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
    </div>
  );
};

export { CopyUrl };
