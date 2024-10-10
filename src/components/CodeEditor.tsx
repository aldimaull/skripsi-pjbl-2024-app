"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useEffect, useRef, ReactNode } from "react";
import CodeOutput from "./CodeOutput";
import { Button } from "./ui/button";

const CodeEditor = ({
  id,
  userId,
  projectId,
  children,
}: {
  id: string;
  userId: string;
  projectId: number;
  children?: ReactNode;
}) => {
  const editorRef = useRef();
  const [value, setValue] = useState<string | undefined>("// coba");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/saveCode?projectId=${projectId}&userId=${userId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.data.submission) {
          setValue(data.data.submission);
        }
      } else {
        console.error("Failed to fetch code");
      }
    };
    fetchData();
  }, [projectId, userId]);

  const handleSubmit = async () => {
    const response = await fetch("/api/saveCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value, userId, projectId }),
    });

    if (response.ok) {
      alert(`Code from editor ${id} saved successfully!`);
      location.reload();
    } else {
      alert(`Failed to save code from editor ${id}.`);
    }
  };

  return (
    <div>
      <div className="mb-2">{children}</div>
      <Editor
        height="30vh"
        defaultLanguage="javascript"
        defaultValue={value}
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
      <CodeOutput editorRef={editorRef} language="cpp" />
      <Button onClick={handleSubmit} className="mt-2">
        Simpan Kode
      </Button>
    </div>
  );
};

export default CodeEditor;
