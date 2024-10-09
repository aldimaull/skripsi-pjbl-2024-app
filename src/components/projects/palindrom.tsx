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
    const [rencana, setRencana] = useState<any>();

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
            if (data.data.rencana) {
              setRencana(data.data.rencana);
            }
          } else {
            console.error("Failed to fetch code");
          }
        };
        fetchData();
      }, [projectId, userId]);

      console.log(rencana);

  return (
    <div className="space-y-4">
      <CodeEditor id="1" userId={userId} projectId={projectId}>
        <article
        dangerouslySetInnerHTML={{__html: rencana}}
        />
      </CodeEditor>
    </div>
  );
}
