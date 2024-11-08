import { html } from '@/data/lessons/html';
import { css } from '@/data/lessons/css';
import { javascript } from '@/data/lessons/js';

type LessonType = {
  slug: string;
  href: string;
  title: string;
};

export const findCurrentAndAdjacentLessons = (currentSlug: string, technology: string) => {
  let allLessons: LessonType[] = [];
  let currentTechnology;

  // Texnologiyani aniqlash
  switch (technology) {
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
      return { previous: null, next: null };
  }

  // Barcha darslarni bitta ro'yxatga yig'ish
  currentTechnology.forEach(section => {
    section.lessons.forEach(lesson => {
      if ('subTutorials' in lesson) {
        lesson.subTutorials?.forEach((subLesson) => {
          if (subLesson.href) {
            allLessons.push(subLesson as LessonType);
          }
        });
      }
      if (lesson.href) {
        allLessons.push(lesson as LessonType);
      }
    });
  });

  // Joriy dars indeksini topish
  const currentIndex = allLessons.findIndex(lesson => lesson.slug === currentSlug);

  return {
    previous: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    current: currentIndex !== -1 ? allLessons[currentIndex] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  };
};