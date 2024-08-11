import React, { useState } from "react";
import { Button } from "./ui/button";
import { executeCode } from "@/app/api/api";
import { ButtonLoading } from "./ui/ButtonLoading";
import { useToast } from "./ui/use-toast";

const CodeOutput = ({
  editorRef,
  language,
}: {
  editorRef: any;
  language: any;
}) => {
  const { toast } = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }
    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setisError(true) : setisError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-full bg-secondary dark:bg-secondary p-4 rounded-b-md ${
        isError ? "text-red-400 border-red-400 border" : ""
      }`}
    >
      {loading ? (
        <ButtonLoading size="md" variant="outline" />
      ) : (
        <Button size="md" onClick={runCode} variant="outline">
          Run
        </Button>
      )}
      <div className="h-full mt-2 text-sm lg:text-base">
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : "Klik tombol 'Run' untuk melihat output"}
      </div>
    </div>
  );
};

export default CodeOutput;
