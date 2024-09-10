import { ProjectCardProps, WorkCardProps } from './types';

export const Work: WorkCardProps[] = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'Google',
    location: 'California, USA • Remote',
    logoSrc: '/assets/logos/google.png',
    description:
      "I'm currently contracting for Google where I've been collaborating on external frameworks with the Google Chrome team. I helped experiment with multi-platform large language model serving, including utilizing local LLMs, browser WebGPU models and hosted/server models.",
    type: 'Contracting',
    timeframe: 'Mar 2024 - Present',
    links: {
      linkedin: [
        'https://www.linkedin.com/posts/addyosmani_softwareengineering-programming-ai-activity-7194771495204626432-9_9r?utm_source=share&utm_medium=member_desktop',
        'https://www.linkedin.com/posts/addyosmani_ai-opensource-softwareengineering-activity-7204528186519429120-FX5D?utm_source=share&utm_medium=member_desktop',
      ]
    },
  },
  {
    id: 2,
    title: 'Student Software Developer',
    company: 'Agramkow',
    location: 'Sønderborg, Denmark',
    logoSrc: '/assets/logos/agramkow.jpg',
    description:
      "I'm currently working as a student software developer at Agramkow. This involves creating internal systems for the company. I mainly work with C# and WPF as well as MSSQL.",
    type: 'Part-time',
    timeframe: 'Mar 2024 - Present',
  },
  {
    id: 3,
    title: 'Student Software Developer',
    company: 'Bitzer',
    location: 'Sønderborg, Denmark',
    logoSrc: '/assets/logos/bitzer.png',
    description:
      'I worked as a student software developer at Bitzer. I primarily developed automated tests (xUnit) for their C# WPF application. I also gained experience with Azure DevOps, CI/CD pipelines in Jenkins and Jira',
    type: 'Part-time',
    timeframe: 'Aug. 2023 - Mar. 2024',
  },
];

export const Projects: ProjectCardProps[] = [
  {
    id: 1,
    title: 'Chatty',
    description: 'Private AI that leverages WebGPU to run large language models (LLMs) natively & privately in the browser. This ensures your data never leaves your device and enables offline access. Also has the ability to upload and ask questions about files.',
    videoUrl: 'https://utfs.io/f/4c1e925b-a2c6-4b23-a46a-4f3bf94661d9-ow3q0d.mp4',
    videoAlt: 'Chatty',
    showcaseUrl: 'https://chattyui.com',
    githubUrl: 'https://github.com/addyosmani/chatty',
    skills: [
      '/assets/icons/nextdotjs.svg',
      '/assets/icons/typescript.svg',
      '/assets/icons/tailwindcss.svg',
    ],
  },
  {
    id: 2,
    title: 'shadcn-chat',
    description:
      'CLI for adding customizable and re-usable chat components to your react applications.',
    videoUrl:
      'https://utfs.io/f/3c7ba35d-d065-4e10-ac80-54bb7bd1f6bb-62d9he.MP4',
    videoAlt: 'shadcn-chat',
    showcaseUrl: 'https://shadcn-chat.vercel.app/',
    githubUrl: 'https://github.com/jakobhoeg/shadcn-chat',
    skills: [
      '/assets/icons/nextdotjs.svg',
      '/assets/icons/typescript.svg',
      '/assets/icons/tailwindcss.svg',
    ],
  },
  {
    id: 3,
    title: 'Proglio',
    description:
      'A full-stack collaborative task management platform coded in React with NextJS, MongoDB & TypeScript.',
    videoUrl:
      'https://utfs.io/f/5b16af86-9095-4aae-a7d1-8b1c5bb0a9b1-mew4t3.MP4',
    videoAlt: 'Proglio',
    showcaseUrl: 'https://www.proglio.app/',
    skills: [
      '/assets/icons/nextdotjs.svg',
      '/assets/icons/typescript.svg',
      '/assets/icons/mongodb.svg',
      '/assets/icons/tailwindcss.svg',
    ],
  },
  {
    id: 4,
    title: 'Web app for Ollama LLMs',
    description:
      'Open source web interface for Ollama. Run open-source large language models (LLMs) locally on your pc. The web interface is coded in React with NextJS & TypeScript.',
    videoUrl:
      'https://utfs.io/f/afb47c2a-6f2d-4b45-8e16-d9cd484b3221-grr6xm.MP4',
    videoAlt: 'Web UI for Ollama LLMs',
    githubUrl: 'https://github.com/jakobhoeg/nextjs-ollama-llm-ui',
    skills: [
      '/assets/icons/nextdotjs.svg',
      '/assets/icons/typescript.svg',
      '/assets/icons/tailwindcss.svg',
    ],
  },
  {
    id: 5,
    title: 'Unity Game',
    description:
      'A 2D rougelike, bullet hell top-down game created in Unity Game Engine, coded in C# and designed by me. (Still a WIP).',
    videoUrl:
      'https://utfs.io/f/343d1d89-90b6-440c-93b9-863ad9e32d9e-56ywvu.mp4',
    videoAlt: 'Unity Game',
    skills: ['/assets/icons/unity.svg', '/assets/icons/csharp.svg'],
  },
];
