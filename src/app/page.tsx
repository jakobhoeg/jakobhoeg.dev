import { LocationCard } from "@/components/cards/location";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <h1>
        Hello, I'm Jakob 👋
      </h1>
      <LocationCard />
    </div>
  );
}
