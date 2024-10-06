"use client";
import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import ParticleAnimation from "../../lib/particle-animation";

export function Particle() {
    const { theme } = useTheme();
    const canvasRef = useRef(null);
    const particleInstanceRef = useRef<ParticleAnimation | null>(null);

    const initializeParticleAnimation = useCallback(() => {
        const options = {
            quantity: 30, // Default values or adjust according to your needs
            staticity: 50,
            ease: 50,
            color: theme === "dark" ? "#ffffff" : "#000000",
        };

        if (canvasRef.current) {
            // Destroy existing particle animation instance if exists
            if (particleInstanceRef.current) {
                particleInstanceRef.current.destroy();
            }
            // Create new particle animation instance
            particleInstanceRef.current = new ParticleAnimation(canvasRef.current, options);
        }
    }, [theme]);

    useEffect(() => {
        initializeParticleAnimation();
        return () => {
            // Cleanup function to destroy particle animation instance
            if (particleInstanceRef.current) {
                particleInstanceRef.current.destroy();
            }
        };
    }, [initializeParticleAnimation]);

    useEffect(() => {
        // Reinitialize particle animation when theme changes
        initializeParticleAnimation();
    }, [theme, initializeParticleAnimation]);

    
    return (
        <div className="fixed h-screen w-full">
            <canvas ref={canvasRef} data-particle-animation></canvas>
        </div>
    );
};
