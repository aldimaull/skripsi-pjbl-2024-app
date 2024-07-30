"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Client Components:
const ComponentA = dynamic(() => import("@/components/projects/palindrom/1"));
const ComponentB = dynamic(() => import("@/components/projects/palindrom/2"));
const ComponentC = dynamic(() => import("@/components/projects/palindrom/3"), {
  ssr: false,
});

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
    setButtonClicked(true);
  };

  return (
    <div>
      {/* Load immediately, but in a separate client bundle */}
      <ComponentA />

      {/* Load on demand, only when/if the condition is met */}
      {showMore && <ComponentB />}
      {!buttonClicked && <button onClick={handleToggle}>Toggle</button>}

      {/* Load only on the client side */}
      <ComponentC />
    </div>
  );
}
