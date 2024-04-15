import Link from "next/link";
import React from "react";
import ProjectCard from "./components/project-card";

interface ProjectCardProps {
  id: number;
  title: string;
  videoUrl?: string;
  videoAlt?: string;
  description: string;
  showcaseUrl?: string;
  githubUrl?: string;
  skills: string[];
}

export default function ProjectsPage() {
  const Projects: ProjectCardProps[] = [
    {
      id: 1,
      title: "Proglio",
      description:
        "A full-stack collaborative task management platform coded in React with NextJS, MongoDB & TypeScript.",
      videoUrl:
        "https://utfs.io/f/5b16af86-9095-4aae-a7d1-8b1c5bb0a9b1-mew4t3.MP4",
      videoAlt: "Proglio",
      showcaseUrl: "https://www.proglio.app/",
      skills: [
        "/assets/icons/nextdotjs.svg",
        "/assets/icons/typescript.svg",
        "/assets/icons/mongodb.svg",
        "/assets/icons/tailwindcss.svg",
      ],
    },
    {
      id: 2,
      title: "Web app for Ollama LLMs",
      description:
        "Open source web interface for Ollama. Run open-source large language models (LLMs) locally on your pc. The web interface is coded in React with NextJS & TypeScript.",
      videoUrl:
        "https://utfs.io/f/afb47c2a-6f2d-4b45-8e16-d9cd484b3221-grr6xm.MP4",
      videoAlt: "Web UI for Ollama LLMs",
      githubUrl: "https://github.com/jakobhoeg/nextjs-ollama-llm-ui",
      skills: ["/assets/icons/nextdotjs.svg", "/assets/icons/typescript.svg", "/assets/icons/tailwindcss.svg"],
    },
    {
      id: 3,
      title: "shadcn-chat",
      description:
        "Open source chat components for NextJS. Built on top of the very popular UI library, shadcn.",
      videoUrl:
        "https://utfs.io/f/3c7ba35d-d065-4e10-ac80-54bb7bd1f6bb-62d9he.MP4",
      videoAlt: "Moodle Lazy DL Bot",
      showcaseUrl: "https://shadcn-chat.vercel.app/",
      githubUrl: "https://github.com/jakobhoeg/shadcn-chat",
      skills: ["/assets/icons/nextdotjs.svg", "/assets/icons/typescript.svg", "/assets/icons/tailwindcss.svg"],
    },
    {
      id: 4,
      title: "Unity Game",
      description:
        "A 2D rougelike, bullet hell top-down game created in Unity Game Engine, coded in C# and designed by me. (Still a WIP).",
      videoUrl:
        "https://utfs.io/f/343d1d89-90b6-440c-93b9-863ad9e32d9e-56ywvu.mp4",
      videoAlt: "Unity Game",
      skills: ["/assets/icons/unity.svg", "/assets/icons/csharp.svg"],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h1 className="text-xl font-medium">Projects I&apos;ve worked on</h1>
      <p className="max-w-prose">
        This is a list of some of the projects I&apos;ve worked on. You can find
        more on my{" "}
        <Link href="/github" className="font-semibold">
          GitHub
        </Link>
        .
      </p>

      <div className="mt-2 flex flex-col gap-10 ">
        {Projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
