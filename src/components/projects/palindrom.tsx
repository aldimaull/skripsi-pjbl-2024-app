"use client";

import { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";

export default function ClientComponentExample({
  userId,
  projectId,
}: {
  userId: string;
  projectId: number;
}) {
  return (
    <div className="space-y-4">
      <CodeEditor id="1" userId={userId} projectId={projectId}>
        <div>Children content for Editor 1</div>
      </CodeEditor>
      <CodeEditor id="2" userId={userId} projectId={projectId}>
        <div>Children content for Editor 1</div>
      </CodeEditor>
    </div>
  );
}
