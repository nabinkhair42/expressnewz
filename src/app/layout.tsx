import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/onUse/NavigationBar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import DateTemperature from "@/components/onUse/DateTemperature";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/onUse/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Express Newz: Fun, Relaxed and Unbiased",
  description:
    "Express Newz is a fun, relaxed and unbiased news source. Nepal and the world, we cover it all.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.className}>
          <NavigationBar />
          <DateTemperature />
          {children}
          <Toaster position="bottom-right" />
          <Footer/>
        </body>
      </ThemeProvider>
    </html>
  );
}
