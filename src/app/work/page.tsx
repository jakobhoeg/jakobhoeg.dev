import { WorkCardProps } from '@/lib/types';
import Link from 'next/link';
import React from 'react'
import WorkCard from './components/work-card';

export default function WorkPage() {

  const Work: WorkCardProps[] = [
    {
      id: 1,
      title: "Software Developer",
      company: "Google",
      location: "California, USA • Remote",
      logoSrc: "/assets/logos/google.png",
      description: "I'm currently contracting fo Google where I've been collaborating on external frameworks with the Google Chrome team. I have helped experiment with AI/LLM model serving, to quickly switch between locally served models (Gemma), browser served models (using WebGPU in conjunction with Gemini) & hosted models (Gemini).",
      type: "Contracting",
      timeframe: "Mar 2024 - Present"
    },
    {
      id: 2,
      title: "Student Software Developer",
      company: "Agramkow",
      location: "Sønderborg, Denmark",
      logoSrc: "/assets/logos/agramkow.jpg",
      description: "I'm currently working as a student software developer at Agramkow. This involves creating in-house software for the compay. This is primarily in C# and .NET.",
      type: "Part-time",
      timeframe: "Mar 2024 - Present"
    },
    {
      id: 3,
      title: "Student Software Developer",
      company: "Bitzer",
      location: "Sønderborg, Denmark",
      logoSrc: "/assets/logos/bitzer.png",
      description: "I worked as a student software developer at Bitzer. I primarily developed automated tests (xUnit) for their C# WPF application. I also gained experience with Azure DevOps, CI/CD pipelines in Jenkins and Jira",
      type: "Part-time",
      timeframe: "Aug. 2023 - Mar. 2024"
    },
  ]

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h1 className="text-xl font-medium">Work experience</h1>
      <p className="max-w-prose">
        This is a list of my work experience. For more information, please visit my <Link className='font-semibold' href="https://www.linkedin.com/in/jakob-hoeg-moerk/">LinkedIn</Link> profile.
      </p>

      <div className="mt-2 flex flex-col gap-10 ">
        {Work.map((work, index) => (
          <WorkCard key={index} {...work} />
        ))}
      </div>
    </div>
  );
}
