import { collections } from "@/lib/constants";
import { InfiniteMovingCards } from "./ui/MovingCollections";

export function MovingCollections() {
  return (
    <section className="flex flex-col antialiased items-center lg:h-screen justify-center relative overflow-hidden my-10">
      <h2 className="uppercase font-semibold text-3xl md:text-5xl my-10">Collections</h2>
      <InfiniteMovingCards
        items={collections}
        direction="left"
        speed="normal"
      />
    </section>
  );
}


