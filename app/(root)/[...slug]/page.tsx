import { notFound } from 'next/navigation';
import React from 'react';
import { html } from '@/data/lessons/html';
import { css } from '@/data/lessons/css';
import { javascript } from '@/data/lessons/js';
import type { Lesson } from '@/types/sidebar';
import './style.css';
const Page = async ({ params }: { params: { slug: string[] } }) => {

  const getCurrentLesson = async (slugParams: string[]): Promise<Lesson | null> => {

    const [technology] = slugParams;
    let currentTechnology;

    switch(technology) {
      case 'html':
        currentTechnology = html;
        break;
      case 'css':
        currentTechnology = css;
        break;
      case 'js':
        currentTechnology = javascript;
        break;
      default:
        return notFound();
    }

    const currentPath = `/${slugParams.join('/')}`;

    for (const section of currentTechnology) {
      for (const lesson of section.lessons) {
        if (lesson.href === currentPath) return lesson;
        if (lesson.subTutorials) {
          const subLesson = lesson.subTutorials.find(sub => sub.href === currentPath);
          if (subLesson) return subLesson;
        }
      }
    }
    return null;
  };

  const lesson = await getCurrentLesson(params.slug);
  if (!lesson) return notFound();

  return (
    <div className="flex flex-col w-full font-normal text-base">
      {lesson.content}
    </div>
  );
};

export default Page;