"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
        router.refresh();
      }}
      variant="secondary"
      size="md"
      className="my-2"
    >
      Kembali
    </Button>
  );
};

export default ButtonBack;
