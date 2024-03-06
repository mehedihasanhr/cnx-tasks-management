"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

interface RichEditorPropTypes {
  placeholder: string;
  className?: string;
}

function RichEditor({ placeholder, className }: RichEditorPropTypes) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  return (
    <div
      className={cn(
        "min-h-32 w-full rounded-lg border border-base-400 p-4",
        className
      )}
    >
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder={placeholder}
      />
    </div>
  );
}

export default RichEditor;
