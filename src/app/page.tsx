import GithubCard from "@/components/cards/github";
import { GlobeCard } from "@/components/cards/globe";
import IconsCard from "@/components/cards/icons";
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
      <div className="mt-2 grid gap-6 grid-cols-9 md:grid-cols-7 grid-rows-2  ">

      <PersonalCard />
      <div className="flex flex-col gap-6 col-start-4 md:col-start-3 col-span-2">
        <LinkedInCard />
        <GithubCard />
      </div>
      <ProjectsCard />
      <IconsCard  />
      <GlobeCard />
      </div>
    </div>
  );
}
