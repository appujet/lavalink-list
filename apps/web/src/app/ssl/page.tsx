'use client';

import NodeList from '../../components/home/NodeList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NodeDetails from '../../components/home/NodeDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ApiNode } from '../../types';


export default function Ssl() {
    const router = useRouter();
    const [data, setData] = useState<ApiNode[]>([]);
    const [isClicked, setClicked] = useState<boolean>(false);
    const [clikedNode, setClickedNode] = useState<ApiNode | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/ssl', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();

            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchData();
        AOS.init();
        // Fetch data every 2 minute
        const intervalId = setInterval(() => {
            fetchData();
        }, 60 * 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="w-full max-w-6xl mx-auto md:px-6 py-2">
                <div className="px-5 xl:px-0 mx-auto">
                    <h1
                        className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
                        data-aos="fade-up"
                    >
                        <Balancer>SSL <span className='bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.green.300),theme(colors.green.100),theme(colors.sky.400),theme(colors.yellow.200),theme(colors.sky.400),theme(colors.green.100),theme(colors.green.300))] bg-[length:200%_auto] animate-gradient'>Lavalink</span></Balancer>
                    </h1>
                    <p
                        className="mt-6 text-center lg:text-1xl font-light text-zinc-500 dark:text-zinc-200"
                        data-aos="fade-up"
                    >
                        <Balancer>
                            A list of free and available public Lavalink nodes with their live status.
                        </Balancer>
                    </p>
                    <div className="flex flex-wrap justify-center mt-8 space-x-2 items-center gap-2" data-aos="fade-up-left">
                        <a
                            className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
                            href="/"
                        >
                            <FontAwesomeIcon icon={faHouse as any} />
                            <p>Home</p>
                        </a>
                        {/* button for non ssl lava links */}
                        <button
                            className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-primary border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:px-5 sm:py-2.5 hover:shadow-lg sm:hover:scale-[1.05] dark:bg-opacity-50 dark:backdrop-blur-sm dark:bg-white/10"
                            onClick={() => {
                                router.push("/non-ssl");
                            }}
                        >
                            <FontAwesomeIcon icon={faLockOpen as any} />
                            <p>Non SSL Lavalink</p>
                        </button>
                    </div>
                </div>
                {/* node list */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-4">
                        {data.map((node) => (
                            <div key={node.host} className="lg:w-4/4 md:w-2/2 w-full" data-aos="fade-up">
                                <NodeList node={node} setClicked={setClicked} setClickedNode={setClickedNode} />

                            </div>
                        ))}
                    </div>
                )}
                <NodeDetails node={clikedNode as any} visible={isClicked} onClick={() => setClicked(false)} />
            </div>
        </>
    );
}
