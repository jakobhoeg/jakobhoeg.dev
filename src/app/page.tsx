import { LocationCard } from "@/components/cards/location";
import { PersonalCard } from "@/components/cards/personal";
import { TimeCard } from "@/components/cards/time";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <h1 className="text-xl">
        Hello, I&apos;m Jakob 👋
      </h1>
      <div className="mt-8 grid grid-cols-8 grid-rows-5 gap-8 md:gap-6 md:grid-cols-7 md:grid-rows-3">

      <PersonalCard />
      <TimeCard />
      <LocationCard />
      </div>
    </div>
  );
}
