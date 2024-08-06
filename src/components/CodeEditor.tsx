"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import CodeOutput from "./CodeOutput";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState<string | undefined>("");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div>
      <Editor
        height="30vh"
        defaultLanguage="javascript"
        defaultValue="// coba"
        onChange={(value) => setValue(value)}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          wrappingIndent: "indent",
          automaticLayout: true,
        }}
        onMount={onMount}
        value={value}
      />
      <CodeOutput editorRef={editorRef} language="javascript" />
    </div>
  );
};

export default CodeEditor;
