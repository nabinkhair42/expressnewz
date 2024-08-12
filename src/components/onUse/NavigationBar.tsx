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
      href: "/world",
    },
    {
      icon: BriefcaseBusiness,
      title: "Business",
      href: "/business",
    },
    {
      icon: Smile,
      title: "Lifestyle",
      href: "/lifestyle",
    },
    {
      icon: Trophy,
      title: "Sports",
      href: "/sports",
    },
    {
      icon: Tractor,
      title: "Agriculture",
      href: "/agriculture",
    },
    {
      icon: Laptop,
      title: "Technology",
      href: "/technology",
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
      href: "/business",
      icon: BriefcaseBusiness,
    },
    {
      title: "Politics",
      href: "/politics",
      icon: Globe, 
    },
    {
      title: "Trending",
      href: "/trending",
      icon: Trophy, 
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="h-20 border-b px-4">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="text-left">
            <p className="font-bold text-2xl text-primary">Express Newz</p>
            <span className="text-sm">Fun, Relaxed and Unbiased</span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {HorizontalMenu.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.href} className="flex items-center gap-2">
              <item.icon size={20} className="text-primary" />
              <span className="font-semibold hover:text-primary transition-colors">
                {item.title}
              </span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" onClick={notify}>
            Sign Up{" "}
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
            <Link href={item.href} className="flex items-center gap-2">
              <item.icon
                size={24}
                className="rounded-full bg-primary text-white w-fit h-10 p-2 aspect-square"
              />
              <span className="font-semibold">{item.title}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
