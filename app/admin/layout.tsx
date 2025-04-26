"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import { sourceSansPro } from "@/config/fonts";
import { clsx } from "clsx";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="uz">
      <head />
      <body 
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background font-sansPro antialiased",
          sourceSansPro.className
        )}
      >
        {children}
      </body>
    </html>
  );
} 