import GithubCard from '@/components/cards/github';
import { GlobeCard } from '@/components/cards/globe';
import IconsCard from '@/components/cards/icons';
import LinkedInCard from '@/components/cards/linkedin';
import { PersonalCard } from '@/components/cards/personal';
import ProjectsCard from '@/components/cards/projects';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h1 className="text-xl font-medium">Hey there, curious 👋</h1>
      <p className="prose dark:prose-invert">
        I&apos;m an aspiring software developer located in Denmark and I love to
        help create better UX and DX - especially through OSS (Open Source Software).
        <br />
        Currently, I am contracting for{' '}
        <Link href="/work" className="font-semibold">
          Google
        </Link>{' '}
        and working as a student software developer at{' '}
        <Link href="/work" className="font-semibold">
          Agramkow
        </Link>
        .
      </p>
      <div className="mt-2 grid grid-cols-9 grid-rows-3 gap-6 md:grid-cols-7 md:grid-rows-2  ">
        <PersonalCard />
        <div className="col-span-4 col-start-6 row-start-3 flex h-full flex-col justify-between gap-6 md:col-span-2 md:col-start-3 md:row-start-2">
          <LinkedInCard />
          <GithubCard />
        </div>
        <ProjectsCard />
        <IconsCard />
        <GlobeCard />
      </div>
    </div>
  );
}
