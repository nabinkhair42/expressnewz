import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import Team1 from "/public/author/author.jpg";
import { Twitter, Whatsapp, LinkedIn, Facebook } from "@/icons/icons";
import Link from "next/link";

const TeamMemberDetails = [
  {
    image: Team1,
    name: "Team Member Name",
    position: "CEO, Company Name",
    description:
      "Our team is made up of a group of individuals who are experts in their field. We are passionate about what we do and are committed to providing the best service possible.",
    social: [
      { href: "#", icon: Facebook, label: "Facebook" },
      { href: "#", icon: LinkedIn, label: "LinkedIn" },
      { href: "#", icon: Twitter, label: "Twitter" },
    ],
  },

  {
    image: Team1,
    name: "Team Member Name",
    position: "CEO, Company Name",
    description:
      "Our team is made up of a group of individuals who are experts in their field. We are passionate about what we do and are committed to providing the best service possible.",
    social: [
      { href: "#", icon: Facebook, label: "Facebook" },
      { href: "#", icon: LinkedIn, label: "LinkedIn" },
      { href: "#", icon: Twitter, label: "Twitter" },
    ],
  },

  {
    image: Team1,
    name: "Team Member Name",
    position: "CEO, Company Name",
    description:
      "Our team is made up of a group of individuals who are experts in their field. We are passionate about what we do and are committed to providing the best service possible.",
    social: [
      { href: "#", icon: Facebook, label: "Facebook" },
      { href: "#", icon: LinkedIn, label: "LinkedIn" },
      { href: "#", icon: Twitter, label: "Twitter" },
    ],
  },

  {
    image: Team1,
    name: "Team Member Name",
    position: "CEO, Company Name",
    description:
      "Our team is made up of a group of individuals who are experts in their field. We are passionate about what we do and are committed to providing the best service possible.",
    social: [
      { href: "#", icon: Facebook, label: "Facebook" },
      { href: "#", icon: LinkedIn, label: "LinkedIn" },
      { href: "#", icon: Twitter, label: "Twitter" },
    ],
  },

  {
    image: Team1,
    name: "Team Member Name",
    position: "CEO, Company Name",
    description:
      "Our team is made up of a group of individuals who are experts in their field. We are passionate about what we do and are committed to providing the best service possible.",
    social: [
      { href: "#", icon: Facebook, label: "Facebook" },
      { href: "#", icon: LinkedIn, label: "LinkedIn" },
      { href: "#", icon: Twitter, label: "Twitter" },
    ],
  },
];
const OurTeamCard = () => {
  return (
    <>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Our Team
            </h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-muted-foreground">
              Meet the team that makes it all happen. We are a diverse group of
              individuals with a common goal to make the web a better place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
            {TeamMemberDetails.map((member, index) => (
              <Card key={index} className="overflow-hidden rounded-md p-5">
                <CardHeader className="flex items-center flex-col justify-center">
                  <Image
                    className="flex-shrink-0 object-cover w-14 h-14 rounded-full border-2 border-primary"
                    src={member.image}
                    alt={member.name}
                  />
                  <CardTitle className="w-full text-center truncate">
                    {member.name}
                    <p className="text-lg text-muted-foreground">
                      {member.position}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{member.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-around items-center">
                  {member.social.map((social, idx) => (
                    <Link
                      key={idx}
                      href={social.href}
                      className="inline-block hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </Link>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeamCard;
