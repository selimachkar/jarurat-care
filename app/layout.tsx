import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Navbar1 from "@/components/navbar";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          " min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="bg-gradient-to-tr from-red-500 to-purple-400">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col">
            <Navbar1 />
            <main className=" w-full mx-auto flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
             
                <span className="text-default-600">Powered by </span>
                <p className="text-primary"> Selim Chaaya Alachkar</p>
            </footer>
          </div>
        </Providers>
        </div>
      </body>
    </html>
  );
}
