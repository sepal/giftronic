"use client";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface Props {
  onChange: (text: string) => void;
  defaultText?: string;
  placeholder?: string;
}

const divStart = new RegExp(/<div>/gi);
const divEnd = new RegExp(/<\/div>/gi);

const MemeTextInput = ({
  onChange,
  defaultText = "",
  placeholder = "",
}: Props) => {
  const text = useRef(defaultText);

  const handleChange = (event: ContentEditableEvent) => {
    text.current = event.target.value
      .replace(/<br>/, "")
      .replaceAll(divStart, "")
      .replaceAll(divEnd, "\n");
    onChange(text.current);
  };

  return (
    <ContentEditable
      html={text.current}
      onChange={handleChange}
      placeholder={placeholder}
      className="bg-black bg-opacity-20 outline-none text-white text-center md:text-4xl"
    />
  );
};

export { MemeTextInput };
