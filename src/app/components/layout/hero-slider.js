"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Hero() {
    const slide_Images = [
        {url: '/img/GaCuonBK.webp'},
        {url: '/img/GaQueKem.webp'},
        {url: '/img/MiY.webp'},
    ];

    const [current, setCurrent] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);

    const nextSlide = () => {
        setCurrent(current === slide_Images.length - 1 ? 0 : current + 1);
        setAutoSlide(false);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? slide_Images.length - 1 : current - 1);
        setAutoSlide(false);
    };

    const dotBehave = index => {
        setCurrent(index);
        setAutoSlide(false);
    };

    useEffect(() => {
        if (autoSlide) {
            const interval = setInterval(() => {
                setCurrent(current => current === slide_Images.length - 1 ? 0 : current + 1);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [autoSlide, slide_Images.length]);

    return(
        <div className="overflow-hidden h-[322px] w-full flex" onMouseEnter={() => setAutoSlide(false)} onMouseLeave={() => setAutoSlide(true)}>    
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
                {slide_Images.map((img, index) => (
                    <Image 
                        className={`opacity-0 absolute w-full h-full transition-all duration-300 ${index === current ? 'opacity-100' : 'opacity-0'}`}
                        layout={'fill'}
                        objectFit={'cover'}
                        key={"banner" + index}  
                        src={img.url} 
                        alt={`image ${index}`}
                    />
                ))}
                <button 
                    className="absolute rounded-full bg-white text-black p-2 top-[50%] left-[10px] shadow-lg transition-all" 
                    onClick={prevSlide}>
                    <FaAngleLeft />
                </button>
                <button 
                    className="absolute rounded-full bg-white text-black p-2 top-[50%] right-[10px] shadow-lg" 
                    onClick={nextSlide}>
                    <FaAngleRight />
                </button>
                <div className='absolute bottom-2 flex gap-2 left-[50%]'>
                    {Array.from({length: slide_Images.length}).map((item, index) => (
                        <div className={current === index? "dot active" : "dot"} onClick={() => dotBehave(index)} ></div>
                    ))}
                    
                </div>
            </div>   
            
        </div>
        
    );
}

