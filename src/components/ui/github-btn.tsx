"use client";

import * as React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function GithubBtn() {

  return (
    <Button
      variant="outline"
      onClick={
        () => window.open("https://github.com/jakobhoeg/")
      }
      className="rounded-full"
    >
      <GitHubLogoIcon className="w-5 h-5" />
      <span className="sr-only">Github link</span>
    </Button>
  );
}
