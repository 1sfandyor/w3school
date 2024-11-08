import { cn } from '@/lib/utils';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname, useRouter, redirect } from 'next/navigation';
import React, { useState, useEffect, Fragment } from 'react';
import W3Button from './button';
import { html } from '@/data/lessons/html';
import { css } from '@/data/lessons/css';
import { javascript } from '@/data/lessons/js';

const Sidebar = () => {
  const pathname = usePathname();
  const [openLessonId, setOpenLessonId] = useState<string>('');
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState<string>('');

  // Sahifa yuklanganda subtutorial tekshirish
  useEffect(() => {
    const currentTechnology = getCurrentTechnology();
    if (!currentTechnology) return;

    currentTechnology.forEach(section => {
      section.lessons.forEach(lesson => {        
        if (lesson.subTutorials?.some(sub => sub.href === pathname)) {
          setOpenLessonId(lesson.id);
          setSelectedLesson(lesson.id);
        }
      });
    });
  }, [pathname]);

  // Joriy texnologiyani aniqlash
  const getCurrentTechnology = () => {
    const path = pathname.split('/')[1];
    switch(path) {
      case 'html':
        return html;
      case 'css':
        return css;
      case 'js':
        return javascript;
      default:
        redirect('/not-found');
        return null;
    }
  };

  const handleClick = (lesson: any) => {
    if(lesson.subTutorials) {
      setSelectedLesson(lesson.id);
      if (lesson.subTutorials.length > 0) {
        router.push(lesson.subTutorials[0].href as string);
      }
      setOpenLessonId(openLessonId === lesson.id ? '' : lesson.id);
    }
  }

  const currentTechnology = getCurrentTechnology();
  if (!currentTechnology) return null;

  return (
    <div className='hidden max-w-[250px] slp:fixed slp:flex slp:flex-col w-[280px] bg-darkGreen-3 text-gray-6 h-screen overflow-y-scroll pb-[115px]
    scrollbar-thin !scrollbar-track-darkGreen-3 !scrollbar-thumb-darkGreen-4
    '>
      <div className=''>
        {currentTechnology.map((item) => (
          <div key={item.id}>
            <div className="pt-5">
              <h2 className='pl-4 text-[21px]'>{item.title}</h2>
            </div>

            <div className='w-full flex flex-col'>
              {item.lessons.map((lesson) => (
                <Fragment key={lesson.id}>
                  <W3Button 
                    className={cn(
                      'text-[15px] w-full flex justify-between hover:bg-darkGreen-4 pt-0.5 pr-[15px] pb-px pl-10',
                      pathname === lesson.href && 'bg-green-1 text-white-2',
                      lesson?.subTutorials && 'bg-transparent text-gray-6 h-fit rounded-none',
                      lesson.subTutorials && selectedLesson === lesson.id && 'bg-darkGreen-4'
                    )}
                    {...(!lesson.subTutorials && { href: lesson.href as string })}
                    onClick={() => handleClick(lesson)}
                  >
                    {lesson.title}
                    {lesson?.subTutorials && 
                      <FontAwesomeIcon 
                        className={cn(openLessonId === lesson.id && 'rotate-180')} 
                        height={15}  
                        icon={faChevronDown} 
                        width={15} 
                      />
                    }
                  </W3Button>

                  {openLessonId === lesson.id && lesson?.subTutorials && (
                    <div className='flex flex-col bg-darkGreen-4'>
                      {lesson.subTutorials.map((sub) => (
                        <Link 
                          key={sub.id} 
                          className={cn(
                            "hover:text-white-1 pt-0.5 pr-[15px] pb-px pl-[55px]",
                            pathname === sub.href && 'bg-green-1 text-white-1'
                          )} 
                          href={sub.href as string}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar