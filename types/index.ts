import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// MENU AND NAVIGATION
export type MenuItem = {
  title: string
  info?: string
  items?: {
    name: string
    links: { text: string; url: string, sub?: string | React.ReactNode, subLinks?: { text?: string; url?: string }[] }[]
  }[]
  links?: { text: string; url: string, sub?: string | React.ReactNode }[]
}

// TECH STACKS  
export interface StackSectionProps {
  bgColor: string
  title: string
  description: string
  buttons: {
    text: string
    url: string
    bg: string
  }[]
  buttonBg: string
  buttonText: string
  codeSnippetText: string,
  codeSnippet: string
  syntax: string
  href: string
};


export interface StackCardsProp {
  bgColor: string
  title: string
  url?: string
  description?: string,
  button?: {
    text: string
    url: string
    bg: string
  }
}


// FEATURES
export interface FeaturesProps {
  id: number
  title: string
}


// FOOTER
export interface FooterItemsProps {
  name: string
  href: string
}


export interface FooterLinksProps {
  name: string
  items?: {
    name: string
    href: string
  }[]
}

export interface HTMLContent {
  content: string | React.ReactNode;
}