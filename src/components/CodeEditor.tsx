"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";

const CodeEditor = ({ defaultValue }: { defaultValue: string }) => {
  const [editorValue, setEditorValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = localStorage.getItem("editorValue");
    if (storedValue) {
      setEditorValue(storedValue);
    }
  }, []);

  const handleEditorChange = (newValue: string | undefined = "") => {
    setEditorValue(newValue || "");
    localStorage.setItem("editorValue", newValue || "");
  };

  return (
    <Editor
      height="30vh"
      defaultLanguage="javascript"
      defaultValue={editorValue}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        wrappingIndent: "indent",
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
