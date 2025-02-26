'use client'

import Link from "next/link";
import useScroll from "../../lib/use-scroll";
import ThemeButton from "../theme/ThemeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolcano } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";


export default function NavBar() {
    // Get the scroll position using useScroll hook
    const scrolled = useScroll(50);

    return (
        <>
            {/* Use dark mode variant based on the condition */}
            <div
                className={`fixed top-0 w-full flex justify-center ${scrolled
                    ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl bg-opacity-70 dark:bg-background/50 dark:bg-opacity-70 dark:border-gray-700"
                    : "bg-white/0 bg-gray-800 bg-opacity-70 dark:bg-background/50 dark:bg-opacity-70 dark:border-gray-700 border-b-0"
                    } z-30 transition-all`}
            >
                <div className="mx-5 flex h-16 max-w-screen-xl items-center w-full space-x-5 pointer-events-auto">
                    {/* Use dark text color in dark mode */}
                    <Link href="/" className="flex items-center font-display text-2xl font-bold dark:text-white lg:hover:scale-[1.10] duration-200">
                        <FontAwesomeIcon icon={faVolcano as any} className="h-8 w-8 text-purple-500 mr-2 text-opacity-90" />
                        <p className="hidden sm:inline-block bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.gray.400),theme(colors.gray.100),theme(colors.teal.300),theme(colors.purple.400),theme(colors.teal.300),theme(colors.gray.100),theme(colors.gray.400))] bg-[length:200%_auto] animate-gradient">Lavalink List</p> {/* Show on small screens and above */}
                    </Link>
                    <div className="sm:hidden"> {/* Hide on small screens and above */}
                        <Link href="/" className="flex items-center font-display text-xl font-bold dark:text-white hover:scale-[1.10] duration-200">

                        </Link>
                    </div>
                </div>

                <div className="mx-5 flex h-15 max-w-screen-xl items-center w-full space-x-3 pointer-events-auto justify-end">
                    {/* github link */}
                    <Link
                        href="https://github.com/appujet/lavalink-list"
                        className="flex items-center font-display text-2xl font-bold dark:text-white mr-2 lg:hover:scale-[1.10] duration-200"
                    >
                        <FontAwesomeIcon icon={faGithub as any} />
                    </Link>
                    <Link
                        href="https://discord.gg/atS9JVKVne"
                        className="flex items-center font-display text-2xl font-bold dark:text-white lg:hover:scale-[1.10] duration-200"
                    >
                        <FontAwesomeIcon icon={faDiscord as any} />
                    </Link>
                    {/* theme button */}
                    <ThemeButton />
                </div>

            </div>
        </>
    );
}
