import { Fira_Code as FontMono, Inter as FontSans, Freckle_Face, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const freckle  = Freckle_Face({
  subsets: ['latin'],
  variable: '--font-freckle',
  weight: '400',
});

export const monospace = Space_Mono({
  subsets: ['latin'],
  variable: '--font-monospace',
  weight: '400',
});

export const segeo = localFont({
  src: [
    { path: '../public/fonts/SegoeUI.woff2', weight: '400' },
    { path: '../public/fonts/SegoeUI-Bold.woff2', weight: '700' },
  ],
  style: 'normal',
  variable: '--font-segoe'
});


export const verdana = localFont({
  src: [
    { path: '../public/fonts/Verdana.woff2', weight: '400' },
    { path: '../public/fonts/Verdana-Bold.woff2', weight: '700' },
  ],
  style: 'normal',
  variable: '--font-verdana'
});

export const consolas = localFont({
  src: [
    { path: '../public/fonts/Consolas.woff2', weight: '400' },
  ],
  style: 'normal',
  variable: '--font-consolas'
});

export const menlo = localFont({
  src: [
    { path: '../public/fonts/Menlo.woff2', weight: '400' },
  ],
  style: 'normal',
  variable: '--font-menlo'
});

export const sourceSansPro = localFont({
  src: [
    { path: '../public/fonts/SourceSansPro-Black.woff2', weight: '900' },
    { path: '../public/fonts/SourceSansPro-Bold.woff2', weight: '700' },
    // { path: '../public/fonts/SourceSansPro-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/SourceSansPro-Regular.woff2', weight: '400' },
    { path: '../public/fonts/SourceSansPro-Light.woff2', weight: '300' },
  ],
  style: 'normal',
  variable: '--font-source-sans-pro',
});

