"use client";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
} from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

interface Props {
  onChange: (text: string) => void;
  defaultText?: string;
  placeholder?: string;
}

const MemeTextInput = ({
  onChange,
  defaultText = "",
  placeholder = "",
}: Props) => {
  function setDefaultText() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(defaultText));
      root.append(paragraph);
    }
  }

  const initialConfig = {
    namespace: "MyEditor",
    onError: console.error,
    editorState: setDefaultText,
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      onChange(root.getTextContent());
    });
  };

  return (
    <div className="relative bg-opacity-25 bg-black">
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable value={"test"} className="" />}
          placeholder={
            <div className="absolute w-full top-0 pointer-events-none select-none text-gray-300">
              {placeholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
    </div>
  );
};

export { MemeTextInput };
