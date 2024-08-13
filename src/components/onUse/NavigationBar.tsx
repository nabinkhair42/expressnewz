//@ts-nocheck
"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
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
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import Weather from "./Weather";


export default function NavigationBar() {
  const notify = () =>
    toast.error(
      "Sign up is not available at the moment. Please try again later."
    );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const menuItems = [
    {
      icon: HomeIcon,
      title: "Homepage",
      href: "/",
    },
    {
      icon: Globe,
      title: "World",
      href: "/categories/world",
    },
    {
      icon: BriefcaseBusiness,
      title: "Business",
      href: "/categories/business",
    },
    {
      icon: Smile,
      title: "Lifestyle",
      href: "/categories/lifestyle",
    },
    {
      icon: Trophy,
      title: "Sports",
      href: "/categories/sports",
    },
    {
      icon: Tractor,
      title: "Agriculture",
      href: "/categories/agriculture",
    },
    {
      icon: Laptop,
      title: "Technology",
      href: "/categories/technology",
    },
  ];

  const HorizontalMenu = [
    {
      title: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      title: "Business",
      href: "/categories/business",
      icon: BriefcaseBusiness,
    },
    {
      title: "Politics",
      href: "/categories/politics",
      icon: Globe,
    },
    {
      title: "Trending",
      href: "/categories/trending",
      icon: Trophy,
    },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="h-20 border-b">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-left">
            <p className="font-bold text-2xl text-primary">Express Newz</p>
            <span className="text-sm">Fun, Relaxed and Unbiased</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {HorizontalMenu.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.href}
              className="flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <item.icon size={20} className="text-primary" />
              <span className="font-semibold hover:text-primary transition-colors">
                {item.title}
              </span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent>
        <Weather/>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Button color="primary" onClick={notify}>
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            color="primary"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="pt-8 flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={index}
            className="hover:bg-muted rounded-md py-2 px-4 w-48 transition-colors"
          >
            <Link
              href={item.href}
              className="flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <item.icon
                size={24}
                className="rounded-full bg-primary text-white w-fit h-10 p-2 aspect-square"
              />
              <span className="font-semibold">{item.title}</span>
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem className="flex md:hidden pl-4">
          <Button color="primary" onClick={notify}>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
