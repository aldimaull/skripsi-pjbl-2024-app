"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { MoonIcon } from "@radix-ui/react-icons";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        id="dark-mode"
        checked={theme === "dark" ? true : false}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}
