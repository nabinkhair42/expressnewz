"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon, MailIcon, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Twitter, Whatsapp, LinkedIn, Facebook } from "@/icons/icons";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "#", icon: HomeIcon, label: "Home" },
    { href: "#", icon: PencilIcon, label: "Blog" },
  ],
  contact: {
    social: {
      Facebook: {
        name: "Facebook",
        url: (currentUrl: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        icon: Facebook,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: (currentUrl: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        icon: LinkedIn,
      },
      X: {
        name: "Twitter",
        url: (currentUrl: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
        icon: Twitter,
      },
      WhatsApp: {
        name: "WhatsApp",
        url: (currentUrl: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
        icon: Whatsapp,
      },
      Email: {
        name: "MailIcon",
        url: (currentUrl: string) => `mailto:?subject=Check this out&body=${encodeURIComponent(currentUrl)}`,
        icon: MailIcon,
      },
    },
  },
};

export function ShareMenu() {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // Ensure the window object is available
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <TooltipProvider>
      <Dock direction="middle">
        {Object.entries(DATA.contact.social).map(([name, social]) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={social.url(currentUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <social.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>      
    </TooltipProvider>
  );
}
