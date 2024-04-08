"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon">
        <SunIcon
            onClick={() => setTheme("light")}
            className="w-6 h-6"
            aria-label="Switch to light mode"
        />
        <MoonIcon
            onClick={() => setTheme("dark")}
            className="w-6 h-6"
            aria-label="Switch to dark mode"
        />
    </Button>
  );
}
