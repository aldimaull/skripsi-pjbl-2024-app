"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="dark-mode">Dark Mode</Label>
      <Switch
        id="dark-mode"
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}
