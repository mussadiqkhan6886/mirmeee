import { collections } from "@/lib/constants";
import { InfiniteMovingCards } from "./ui/MovingCollections";

export function MovingCollections() {
  return (
    <section className="flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <h2 className="uppercase font-semibold text-5xl my-10">Categories</h2>
      <InfiniteMovingCards
        items={collections}
        direction="left"
        speed="slow"
      />
    </section>
  );
}


