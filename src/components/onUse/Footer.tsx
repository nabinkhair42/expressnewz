import React from "react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";
// Define the type for link items
interface LinkItem {
  title: string;
  href: string;
}

// Define the data for each section
const aboutLinks: LinkItem[] = [
  { title: "About", href: "#" },
  { title: "Features", href: "#" },
  { title: "Works", href: "#" },
  { title: "Career", href: "#" },
];

const helpLinks: LinkItem[] = [
  { title: "Customer Support", href: "#" },
  { title: "Delivery Details", href: "#" },
  { title: "Terms & Conditions", href: "#" },
  { title: "Privacy Policy", href: "#" },
];

const resourcesLinks: LinkItem[] = [
  { title: "Free eBooks", href: "#" },
  { title: "Development Tutorial", href: "#" },
  { title: "How to - Blog", href: "#" },
  { title: "YouTube Playlist", href: "#" },
];

const extraLinks: LinkItem[] = [
  { title: "Customer Support", href: "#" },
  { title: "Delivery Details", href: "#" },
  { title: "Terms & Conditions", href: "#" },
  { title: "Privacy Policy", href: "#" },
];

const SocialMedia = [
  {
    icon: Twitter,
    href: "#",
  },
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Instagram,
    href: "#",
  },
];

const Footer: React.FC = () => {
  return (
    <section className="py-10 dark:bg-gradient-to-tr from-primary-800 dark:from-primary-50 via-primary-700 dark:via-primary-100 to bg-primary-600 dark:to-primary-200 sm:pt-16 lg:pt-24 transition-colors">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12">
          <div>
            <h1 className="text-2xl font-bold">Express Newz</h1>

            <ul className="mt-8 space-y-4">
              {aboutLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold">Help</p>

            <ul className="mt-8 space-y-4">
              {helpLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold">Resources</p>

            <ul className="mt-8 space-y-4">
              {resourcesLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold">Extra Links</p>

            <ul className="mt-8 space-y-4">
              {extraLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 md:mt-28 2xl:mt-32">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="sm:flex sm:items-center sm:justify-start sm:space-x-8">
              <ul className="flex items-center justify-start space-x-8">
                {SocialMedia.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="">
                      <item.icon size={24} />
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap items-center justify-start mt-5 gap-x-8 sm:mt-0 gap-y-3">
                <li>
                  <Link href="#" className="text-sm ">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm ">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm ">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <p className="mt-6 text-sm lg:mt-0">
              © Copyright {""} {new Date().getFullYear()} All Rights Reserved by Express Newz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
