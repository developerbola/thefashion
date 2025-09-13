import Hero from "@/sections/home/Hero";
import Outfits from "@/sections/home/Outfits";
import Showcase from "@/sections/home/Showcase";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Outfits />
      <Showcase />
    </div>
  );
}
