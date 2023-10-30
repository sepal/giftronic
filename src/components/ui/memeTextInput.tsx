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
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable value={"test"} />}
        placeholder={
          <span className="text-gray-100 text-center select-none pointer-events-none">
            {placeholder}
          </span>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
};

export { MemeTextInput };
