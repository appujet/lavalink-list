'use client';


import Balancer from "react-wrap-balancer";

import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const metadata: Metadata = {
    title: '404 - Page Not Found',
};


export default function NotFound() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <div className="w-full max-w-6xl mx-auto md:px-6 py-2">
                <div className="px-5 xl:px-0 mx-auto">
                    <h1
                        className="text-center font-display text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
                        data-aos="fade-up"
                    >
                        <Balancer><span className='bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.red.900),theme(colors.red.600),theme(colors.pink.700),theme(colors.rose.800),theme(colors.pink.700),theme(colors.red.600),theme(colors.red.900))] bg-[length:200%_auto] animate-gradient'>404</span></Balancer>
                    </h1>
                    <p
                        className="mt-6 text-center lg:text-1xl font-light text-zinc-500 dark:text-zinc-200"
                        data-aos="fade-up"
                    >
                        <Balancer>
                            Page Not Found
                        </Balancer>
                    </p>
                    <div className="flex flex-wrap justify-center mt-6 space-x-2 items-center gap-2" data-aos="fade-up-left">
                        <a
                            className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-600 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
                            href="/"
                        >
                            <FontAwesomeIcon icon={"fa-solid fa-house" as any} />
                            <p>Browse Home</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}