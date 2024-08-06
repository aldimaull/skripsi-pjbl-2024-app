import React, { useState } from "react";
import { Button } from "./ui/button";
import { executeCode } from "@/app/api/api";
import { ButtonLoading } from "./ui/ButtonLoading";

const CodeOutput = ({
  editorRef,
  language,
}: {
  editorRef: any;
  language: any;
}) => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }
    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary dark:bg-secondary p-4 rounded-b-md">
      {loading ? (
        <ButtonLoading size="md" variant="outline" />
      ) : (
        <Button size="md" onClick={runCode} variant="outline">
          Run
        </Button>
      )}
      <div className="h-[10vh] mt-2 text-sm lg:text-base">
        {output ? output : "Klik tombol 'Run' untuk melihat output"}
      </div>
    </div>
  );
};

export default CodeOutput;
