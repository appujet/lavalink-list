'use client';

import { useRouter } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Faq() {

    useEffect(() => {
        AOS.init({ duration: 12333 });
    }, []);

    const router = useRouter();
    const QnA = [
        {
            name: "How To add my node to this list?",
            answer: "You can add your node to this list by creating a pull request on our github repository.",
            url: "https://github.com/appujet/lavalink-list"
        }
    ]
    return (
        <>
            {/* faq page */}
            <div className="w-full max-w-6xl mx-auto md:px-6 py-2">
                <div className="px-5 xl:px-0 mx-auto">
                    <h1
                        className="text-center font-display text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
                        data-aos="fade-up"
                    >
                        <Balancer><span className='bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient'>FAQ</span></Balancer>
                    </h1>
                    <p
                        className="mt-6 text-center lg:text-1xl font-light text-zinc-500 dark:text-zinc-200"
                        data-aos="fade-up"
                    >
                        <Balancer>
                            Frequently Asked Questions
                        </Balancer>
                    </p>
                    <div className="flex flex-wrap justify-center mt-6 space-x-2 items-center gap-2" data-aos="fade-up-left">
                        <a
                            className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-600 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
                            href="/"
                        >
                            <FontAwesomeIcon icon={faHouse as any} />
                            <p>Home</p>
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 align-middle justify-center">
                    {QnA.map((node) => (
                        <div
                            data-aos="fade-up" data-aos-delay="100"
                            className={`p-4 text-center bg-card/50 backdrop-filter backdrop-blur-sm text-card-foreground light:border light:border-gray-200 rounded-lg shadow mt-4 hover:shadow-lg hover:border-gray-300 dark:bg-card/50 dark:border dark:border-gray-600/30 dark:text-card-foreground hover:dark:border-gray-700/40 transition-all duration-300`}
                            key={node.name}
                        >
                            <h2 className="text-xl font-semibold">{node.name}</h2>
                            <p className="mt-2 text-gray-500">{node.answer}</p>
                            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow dark:bg-white/10 dark:text-white hover:shadow-lg transition-all sm:hover:scale-[1.05] duration-300" onClick={() => {
                                router.push(node.url);
                            }}>Add my node</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}