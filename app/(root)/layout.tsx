import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";


import { Providers } from "../providers";
import NextTopLoader from 'nextjs-toploader';

import { siteConfig } from "@/config/site";
import { sourceSansPro } from "@/config/fonts";
import MainNavbar from "@/components/navbar";
import Footer from "@/components/Footer";

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
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background font-sansPro antialiased",
          sourceSansPro.className
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <MainNavbar />

            <main className="pt-[5.5rem] flex-grow">
            <NextTopLoader
              color="#059862"
              crawl={true}
              crawlSpeed={200}
              easing="ease"
              height={3}
              initialPosition={0.08}
              shadow="0 0 10px #059862,0 0 5px #059862"
              showAtBottom={false}
              showSpinner={true}
              speed={200}
              template='<div class="bar" role="bar"><div class="peg"></div></div> 
              <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
              zIndex={1600}
            />
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
