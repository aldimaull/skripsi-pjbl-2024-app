"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { MoonIcon } from "@radix-ui/react-icons";

export default function ModeToggle() {
  const [isChecked, setIsChecked] = React.useState(true);
  const { theme, setTheme } = useTheme();
  const toggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center gap-2">
      <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        id="dark-mode"
        checked={isChecked}
        defaultChecked={isChecked}
        onCheckedChange={toggleMode}
      />
    </div>
  );
}
