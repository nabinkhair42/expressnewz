import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/Layout/NavigationBar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import DateTemperature from "@/components/onUse/DateTemperature";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Layout/Footer";
import GotoTop from "@/components/reusable/gotoTop";
import SmoothScrolling from "@/components/reusable/SmoothScrolling";

const inter = Mukta({
  weight: ["200", "400", "600"],
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning={true}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.className} suppressHydrationWarning={true}>
          <NavigationBar />
          {/* <DateTemperature /> */}
          <SmoothScrolling>
            <div className="min-h-screen pt-[6rem] container">{children}</div>
          </SmoothScrolling>
          <Toaster position="bottom-right" />
          <GotoTop />
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
