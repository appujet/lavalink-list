"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeButton() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "light");  // Default to light theme
        setMounted(true);
    }, [setTheme]);

    if (!mounted) return null;

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="flex justify-center">
            <button
                className={`flex items-center justify-center w-10 h-10 rounded-full focus:outline-none 
                    ${theme === "light" ? "bg-gray-200/50 hover:bg-gray-300" : "bg-gray-700/50 hover:bg-gray-900"}`}
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
            >
                <FontAwesomeIcon
                    icon={theme === "light" ? faMoon : faSun}
                    className={`h-5 w-5 ${theme === "light" ? "text-dark-500" : "text-yellow-500"}`}
                />
            </button>
        </div>
    );
}
