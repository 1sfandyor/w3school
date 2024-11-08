'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import React from 'react'
import '@/styles/slider.css';

interface ImagesProps {
  images: string[];
}
const Slider = ({ images }: ImagesProps) => {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  function plusSlides(n: number) {
    setSlideIndex(prev => {
      const newIndex = prev + n;
      if (newIndex > 3) return 1;
      if (newIndex < 1) return 3;
      return newIndex;
    });
  }

  function currentSlide(n: number) {
    setSlideIndex(n);
  }

  function showSlides(_n: number) {
    if (typeof window === 'undefined') return;
    
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
      (dots[i] as HTMLElement).className = (dots[i] as HTMLElement).className.replace("active", "");
    }
    (slides[slideIndex-1] as HTMLElement).style.display = "block";  
    (dots[slideIndex-1] as HTMLElement).className += " active";
  }

  return (
    <div className='w-full flex flex-col items-center'>
    
      <div className="flex w-full relative m-auto">
        {
          images.map((image, index) => (
            <div key={index} className="mySlides fade w-full mx-2 my-2 mb-3">
              <div className="text-white-2 text-xs py-2 px-3 absolute top-0">{index + 1} / 3</div>
              <Image alt='nature' className='w-full h-full object-cover align-middle' height={322} src={image} width={920}  />
              <div className="text-[#f2f2f2] text-[15px] px-3 py-2 absolute bottom-2 w-full text-center text">Caption Text</div>
            </div>
          ))
        }

        <button className="prev cursor-pointer absolute top-1/2 w-auto p-[10px] smd:p-[16px] -mt-[22px] text-white-2 font-bold text-[18px] transition-[0.6s] duration-&lsqb;ease&rsqb; select-none rounded-[0_3px_3px_0] hover:bg-black-1/80" onClick={() => plusSlides(-1)}>{"❮"}</button>

        <button className="next cursor-pointer absolute top-1/2 w-auto p-[10px] smd:p-[16px] -mt-[22px] text-white-2 font-bold text-[18px] transition-[0.6s] duration-&lsqb;ease&rsqb; select-none rounded-[3px_0_0_3px] right-0  hover:bg-black-1/80" onClick={() => plusSlides(1)}>{"❯"}</button>
      </div>

      <div className='text-center mb-5'>
        <button aria-label="Slide 1" className="dot cursor-pointer h-[15px] w-[15px] my-0 mx-0.5 bg-[#bbb] rounded-full inline-block transition-[background-color] duration-&lsqb;0.6s&rsqb; ease-&lsqb;ease&rsqb;" onClick={() => currentSlide(1)}/> 
        <button aria-label="Slide 2" className="dot cursor-pointer h-[15px] w-[15px] my-0 mx-0.5 bg-[#bbb] rounded-full inline-block transition-[background-color] duration-&lsqb;0.6s&rsqb; ease-&lsqb;ease&rsqb;" onClick={() => currentSlide(2)}/> 
        <button aria-label="Slide 3" className="dot cursor-pointer h-[15px] w-[15px] my-0 mx-0.5 bg-[#bbb] rounded-full inline-block transition-[background-color] duration-&lsqb;0.6s&rsqb; ease-&lsqb;ease&rsqb;" onClick={() => currentSlide(3)}/> 
      </div>
    
    </div>
  )
}

export default Slider