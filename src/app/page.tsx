import GithubCard from "@/components/cards/github";
import { GlobeCard } from "@/components/cards/globe";
import LinkedInCard from "@/components/cards/linkedin";
import { PersonalCard } from "@/components/cards/personal";
import ProjectsCard from "@/components/cards/projects";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h1 className="text-xl font-medium">
        Hello, I&apos;m Jakob 👋
      </h1>
      <p className="max-w-prose">
        An aspiring software developer located in Denmark who loves to create better UX and DX.<br />
        Currently, I am contracting for <Link href="/work" className="font-semibold">Google</Link> and working as a student software developer at Agramkow.
      </p>
      <div className="mt-2 grid gap-8 grid-cols-7 grid-rows-2 ">

      <PersonalCard />
      <GithubCard />
      <ProjectsCard />
      <LinkedInCard />
      <GlobeCard />
      </div>
    </div>
  );
}
