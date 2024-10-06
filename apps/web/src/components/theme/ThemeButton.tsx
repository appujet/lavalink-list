"use client"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


export default function ThemeButton() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }

        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="flex justify-center">
            <button
                className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
                onClick={handleThemeToggle}
            >
                {theme === "light" ? (
                    <FontAwesomeIcon icon={faMoon as any} className="text-dark-500  h-5 w-5" />
                ) : (
                    <FontAwesomeIcon icon={faSun as any} className="text-yellow-500  h-5 w-5" />
                )}
            </button>
        </div>
    );
}
