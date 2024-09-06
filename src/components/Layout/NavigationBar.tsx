//@ts-nocheck
"use client";
import {
  HomeIcon,
  Globe,
  BriefcaseBusiness,
  Smile,
  Trophy,
  Tractor,
  Laptop,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlignLeft, LogIn, User2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import DateinNepali from "../NepaliDate";
import Weather from "@/components/onUse/Weather";
const Links = [
  {
    icon: HomeIcon,
    title: "गृहपृष्ठ", // Homepage
    href: "/",
  },
  {
    icon: Globe,
    title: "विश्व", // World
    href: "/categories/world",
  },
  {
    icon: BriefcaseBusiness,
    title: "व्यापार", // Business
    href: "/categories/business",
  },
  {
    icon: Smile,
    title: "जीवनशैली", // Lifestyle
    href: "/categories/lifestyle",
  },
  {
    icon: Trophy,
    title: "खेलकुद", // Sports
    href: "/categories/sports",
  },
  {
    icon: Tractor,
    title: "कृषि", // Agriculture
    href: "/categories/agriculture",
  },
  {
    icon: Laptop,
    title: "प्रविधि", // Technology
    href: "/categories/technology",
  },
];
const NavigationMenu = () => {
  const { theme, setTheme } = useTheme();
  const notify = () =>
    toast.error(
      "Sign up is not available at the moment. Please try again later."
    );

  const router = useRouter();
  const pathname = usePathname();
  const checkActivePath = (path: string) => {
    return path === pathname;
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isSidebarOpen]);

  const currentPath = router.pathname;

  return (
    <>
      <nav className="flex justify-between px-8 md:px-12 lg:px-14 items-center border-b shadow-md fixed h-20 z-[999] bg-background w-full bg-primary">
        <div className="flex items-center gap-6">
          <Button
            isIconOnly
            onClick={handleToggleSidebar}
            variant="ghost"
            size={"icon"}
          >
            <AlignLeft />
          </Button>
          <Link href="/" className="flex flex-col items-start">
            <p className="font-bold text-3xl text-orange-400">Express Newz</p>
            <span className="text-xl">रमाईलो, आराम र निष्पक्ष</span>
          </Link>
        </div>

        <div id="links">
          <ul className="hidden lg:flex md:gap-8 items-center">
            {Links.slice(0, 3).map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`py-2 px-4 flex items-center text-xl transition-colors ${
                    checkActivePath(link.href)
                      ? "bg-orange-400 text-background rounded-md"
                      : " hover:bg-primary "
                  }`}
                >
                  <span>
                    <link.icon size={16} className="mr-2" />
                  </span>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="actionButton" className="flex gap-4 md:gap-8 items-center">
          <div
            className="hidden
          md:flex
          "
          >
            <Weather />
          </div>
          <Button onClick={notify} className="hidden xl:flex">
            Sign In
          </Button>
          <Button
            size={"icon"}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            isIconOnly
            variant="ghost"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </nav>

      {/* Sidebar for mobile navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-[999] w-64 h-full bg-background shadow-md"
          >
            <div className="flex justify-between items-center pl-8 border-b h-20">
              <Link href="/" className="flex flex-col items-start">
                <p className="font-bold text-3xl  text-orange-400">
                  Express Newz
                </p>
                <span className="text-xl">रमाईलो, आराम र निष्पक्ष</span>
              </Link>
              {/* <Button
                isIconOnly
                variant="ghost"
                size={"icon"}
                onClick={handleToggleSidebar}
              >
                <X />
              </Button> */}
            </div>
            <ul className="flex flex-col gap-4 p-4 w-full">
              <li className="md:hidden">
                <Weather />
              </li>
              {Links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    onClick={handleToggleSidebar}
                    className={`py-2 px-4 w-full text-2xl flex gap-2 items-center font-medium rounded-md ${
                      checkActivePath(link.href)
                        ? "bg-orange-400 text-background"
                        : "text-muted-foreground  hover:bg-muted"
                    }`}
                  >
                    <span>
                      <link.icon size={16} className="mr-2" />
                    </span>
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Button onClick={notify}>
                  <User2 />
                  Sign In
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
