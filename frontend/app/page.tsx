import Image from "next/image";
import HomePage from "@/deps/home";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <SmoothScroll />
      <HomePage />
    </div>
  );
}
