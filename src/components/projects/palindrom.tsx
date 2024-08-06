"use client";

import { useState } from "react";
import CodeEditor from "../CodeEditor";

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
    setButtonClicked(true);
  };

  return (
    <div className="space-y-4">
      <CodeEditor />
      {showMore && <CodeEditor />}

      {!buttonClicked && <button onClick={handleToggle}>Toggle</button>}
    </div>
  );
}
