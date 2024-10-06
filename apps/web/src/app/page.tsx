'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Balancer from "react-wrap-balancer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faLock, faLockOpen, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="px-5 xl:px-0 mx-auto">
          <h1
            data-aos="fade-up"
            className="text-center font-display text-4xl font-bold drop-shadow-sm md:text-7xl md:leading-[5rem]"
          >
            <Balancer>
              Get <span className='text-purple-400 bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.green.300),theme(colors.green.100),theme(colors.sky.400),theme(colors.yellow.200),theme(colors.sky.400),theme(colors.green.100),theme(colors.green.300))] bg-[length:200%_auto] animate-gradient'>Lavalink</span> nodes for your <span className='bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient'>Discord</span> bot
            </Balancer>
          </h1>
          <p
            className="mt-6 text-center lg:text-2xl font-light text-zinc-500 dark:text-zinc-200"
            data-aos="fade-up"
          >
            <Balancer>
              A list of free and available public Lavalink nodes with their live status.
            </Balancer>
          </p>
          <div className="flex flex-wrap justify-center mt-8 space-x-2 items-center gap-2" data-aos="fade-up-left">
            <a
              className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-600 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
              href="https://github.com/appujet/lavalink-list/blob/main/nodes.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faSquarePlus as any} />
              <p> Add Your Node</p>
            </a>

            {/* button for ssl lava links */}
            <button
              className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-600 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
              onClick={() => {
                router.push("/ssl");
              }}
            >
              <FontAwesomeIcon icon={faLock as any} />
              <p>SSL Lavalink</p>
            </button>
            {/* button for non-ssl lava links */}
            <button
              className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-600 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
              onClick={() => {
                router.push("/non-ssl");
              }}
            >
              <FontAwesomeIcon icon={faLockOpen as any} />
              <p>Non SSL Lavalink</p>
            </button>
            {/* button for faq */}
            <button
              className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-600 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
              onClick={() => {
                router.push("/faq");
              }}
            >
              <FontAwesomeIcon icon={faCircleQuestion as any} />
              <p>FAQ</p>
            </button>
          </div>
        </div>
    
        {/* Additional Content */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-14" data-aos="zoom-in-up">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient">Why Choose Lavalink List?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-card/50 backdrop-filter backdrop-blur-sm text-card-foreground light:border light:border-gray-200 rounded-lg mt-4 hover:shadow-lg hover:border-gray-300d p-4 shadow-md dark:bg-card/50 dark:border dark:border-gray-700/30 dark:text-card-foreground hover:dark:border-gray-700/40 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
              <p className="lg:text-1xl font-light text-zinc-500 dark:text-zinc-400">Lavalink List is built and maintained by a passionate community of developers and Discord enthusiasts.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-card/50 backdrop-filter backdrop-blur-sm text-card-foreground light:border light:border-gray-200 rounded-lg mt-4 hover:shadow-lg hover:border-gray-300d p-4 shadow-md dark:bg-card/50 dark:border dark:border-gray-700/30 dark:text-card-foreground hover:dark:border-gray-700/40 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2">Real-Time Node Status</h3>
              <p className="lg:text-1xl font-light text-zinc-500 dark:text-zinc-400">We provide real-time status information for each Lavalink node, ensuring accurate and up-to-date data.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-card/50 backdrop-filter backdrop-blur-sm text-card-foreground light:border light:border-gray-200 rounded-lg mt-4 hover:shadow-lg hover:border-gray-300d p-4 shadow-md dark:bg-card/50 dark:border dark:border-gray-700/30 dark:text-card-foreground hover:dark:border-gray-700/40 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2">SSL and Non-SSL Options</h3>
              <p className="lg:text-1xl font-light text-zinc-500 dark:text-zinc-400">Choose between SSL and non-SSL Lavalink nodes based on your bot's requirements and security preferences.</p>
            </div>
          </div>
        </div>
        {/*  Technologies */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-10" data-aos="zoom-in-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.green.500),theme(colors.green.200),theme(colors.teal.300),theme(colors.yellow.400),theme(colors.teal.300),theme(colors.green.200),theme(colors.green.500))] bg-[length:200%_auto] animate-gradient">Thanks to These Technologies</h2>
            <div
              x-data="{}"
              x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
              className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-9 backdrop-filter backdrop-blur-sm text-card-foreground"
            >
              <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll aspect-auto object-contain">
                <li>
                  <img src="./turso-logo.svg" alt="Turso" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./github.svg" alt="GitHub" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./deno.svg" alt="Deno" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./next.svg" alt="Next.js" className='dark:filter dark:invert'  />
                </li>
                <li>
                  <img src="./vercel.svg" alt="Vercel" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./tailwind.svg" alt="Tailwind CSS" className='dark:filter dark:invert' />
                </li>
              </ul>
              <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll aspect-auto object-contain">
                <li>
                  <img src="./turso-logo.svg" alt="Turso" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./github.svg" alt="GitHub" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./deno.svg" alt="Deno" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./next.svg" alt="Next.js" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./vercel.svg" alt="Vercel" className='dark:filter dark:invert' />
                </li>
                <li>
                  <img src="./tailwind.svg" alt="Tailwind CSS" className='dark:filter dark:invert' />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}