"use client";

import { useState } from "react";
import CodeEditor from "../CodeEditor";
import { Button } from "../ui/button";

export default function ClientComponentExample({
  userId,
  projectId,
}: {
  userId: string;
  projectId: number;
}) {
  // const [showMore, setShowMore] = useState(false);
  // const [buttonClicked, setButtonClicked] = useState(false);
  // const [editors, setEditors] = useState([{ id: "1", visible: true, userId: userId, projectId: projectId }]);
  const [visibleEditors, setVisibleEditors] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleToggle = () => {
    setVisibleEditors((prevVisibleEditors) => {
      const nextVisibleEditors = [...prevVisibleEditors];
      const nextEditorIndex = nextVisibleEditors.indexOf(false);
      if (nextEditorIndex !== -1) {
        nextVisibleEditors[nextEditorIndex] = true;
      }
      return nextVisibleEditors;
    });
  };

  return (
    <div className="space-y-4">
      {/* <CodeEditor id="1" userId={userId} projectId={projectId} />
      {showMore && <CodeEditor id="2" userId={userId} projectId={projectId} />} */}
      {/* {editors.map((editor) => (
        <CodeEditor
          key={editor.id}
          id={editor.id}
          userId={userId}
          projectId={projectId}
        />
      ))}
      <Button onClick={handleToggle}>Toggle</Button> */}

      {/* {!buttonClicked && <button onClick={handleToggle}>Toggle</button>} */}
      {visibleEditors[0] && (
        <CodeEditor id="1" userId={userId} projectId={projectId}>
          <div>Children content for Editor 1</div>
        </CodeEditor>
      )}
      {visibleEditors[1] && (
        <CodeEditor id="2" userId={userId} projectId={projectId}>
          <div>Children content for Editor 2</div>
        </CodeEditor>
      )}
      {visibleEditors[2] && (
        <CodeEditor id="3" userId={userId} projectId={projectId}>
          <div>Children content for Editor 3</div>
        </CodeEditor>
      )}
      {visibleEditors[3] && (
        <CodeEditor id="4" userId={userId} projectId={projectId}>
          <div>Children content for Editor 4</div>
        </CodeEditor>
      )}
      {visibleEditors[4] && (
        <CodeEditor id="5" userId={userId} projectId={projectId}>
          <div>Children content for Editor 5</div>
        </CodeEditor>
      )}
      {visibleEditors[5] && (
        <CodeEditor id="6" userId={userId} projectId={projectId}>
          <div>Children content for Editor 6</div>
        </CodeEditor>
      )}
      {visibleEditors[6] && (
        <CodeEditor id="7" userId={userId} projectId={projectId}>
          <div>Children content for Editor 7</div>
        </CodeEditor>
      )}
      {visibleEditors[7] && (
        <CodeEditor id="8" userId={userId} projectId={projectId}>
          <div>Children content for Editor 8</div>
        </CodeEditor>
      )}
      <Button onClick={handleToggle}>Toggle</Button>
    </div>
  );
}
