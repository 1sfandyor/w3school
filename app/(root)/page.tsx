import Hero from "@/components/Hero";
import { sectionStacks, stackCards } from "@/data/SectionStacks";
import StackSections from "@/components/StackSections"; 
import StackCards from "@/components/Cards/StackCards";
import StackCardsLink from "@/components/Cards/StackCardsLink";
import { StackCardsLink as StackCardsLinkData } from "@/data/SectionStacks";
import CodeEditorSection from "@/components/sections/CodeEditorSection";
import SpacesSection from "@/components/sections/SpacesSection";
import MyLearningSections from "@/components/sections/MyLearningSections";
import PlusUserSection from "@/components/sections/PlusUserSection";
import ColorPickerSection from "@/components/sections/ColorPickerSection";
import ForTeachersSection from "@/components/sections/ForTeachersSection";
import CodeGameSection from "@/components/sections/CodeGameSection";
import ExeQuizSection from "@/components/sections/ExeQuizSection";
import WebTemplatesSection from "@/components/sections/WebTemplatesSection";
import SertifiedCareerSection from "@/components/sections/SertifiedCareerSection";
import HowToSection from "@/components/sections/HowToSection";

export default function Home() {
  return (
    <section className="flex flex-col items-start w-full h-full">
      {/* HERO */}
      <Hero />

      {/* WAVE */}
      <svg className="w-full h-[70px]" preserveAspectRatio="none" style={{backgroundColor:"#D9EEE1"}} viewBox="0 0 100 100" >
        <path d="M0,0  L110,0C35,150 35,0 0,100z" fill="#282A35" id="wavepath"/>
      </svg>

      {/* STACK SECTIONS */}
      {sectionStacks.map((section, index) => (
        <StackSections key={index} 
          bgColor={section.bgColor} 
          buttonBg={section.buttonBg} 
          buttonText={section.buttonText}
          buttons={section.buttons} 
          codeSnippet={section.codeSnippet}
          codeSnippetText={section.codeSnippetText} 
          description={section.description}
          href={section.href}
          syntax={section.syntax}
          title={section.title} 
        />
      ))}

      {/* STACK CARDS */}
      <section className="flex flex-wrap w-full slp:flex-row flex-col bg-darkGreen-2 py-[64px]">
        {stackCards.map((card, index) => (
          <StackCards key={index} {...card} />
        ))}
      </section>

      {/* STACK CARDS LINK */}
      <section className="flex flex-wrap w-full lt:flex-row flex-col bg-darkGreen-2 pb-[64px]">
        {StackCardsLinkData.map((card, index) => (
          <StackCardsLink key={index} {...card} />
        ))}
      </section>

      {/* CODE EDITOR */}
      <CodeEditorSection />

      {/* W3SCHOOLS SPACES */}
      <SpacesSection />

      {/* MY LEARNING */}
      <MyLearningSections />

      {/* PLUS USER */}
      <PlusUserSection />

      {/* COLOR PICKER */}
      <ColorPickerSection />

      {/* For Teachers */}
      <ForTeachersSection />

      {/* CODE GAME */}
      <CodeGameSection />

      {/* EXERCISES AND QUIZZES */}
      <ExeQuizSection />

      {/* WEB TEMPLATES */}
      <WebTemplatesSection/>

      {/* SERIFIED CAREER */}
      <SertifiedCareerSection/>

      {/* HOW TO */}
      <HowToSection />
    </section>
  );
}
