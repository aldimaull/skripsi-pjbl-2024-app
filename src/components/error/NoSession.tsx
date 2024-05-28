import Link from "next/link";
import React from "react";

const NoSession = () => {
  return (
    <div>
      Silakan{" "}
      <Link href="/login" className="font-bold underline underline-offset-4">
        login
      </Link>{" "}
      terlebih dahulu
    </div>
  );
};

export default NoSession;
