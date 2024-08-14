"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 flex flex-col gap-6">
      <div className="flex gap-5 flex-col">
        <h1 className="text-4xl font-bold text-center ">Our Team</h1>
        <p className="text-lg text-muted-foreground text-center">
          Meet the team behind the magic.
        </p>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "/",
    image: "/author/author.jpg",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "/",
    image: "/author/author.jpg",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "/",
    image: "/author/author.jpg",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "/",
    image: "/author/author.jpg",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "/",
    image: "/author/author.jpg",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "/",
    image: "/author/author.jpg",
  },
];
