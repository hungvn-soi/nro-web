"use client";

import { useEffect, useRef } from "react";

export default function Background() {
    const bgRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     let pos = 50; // background-position-x (%)
    //     let dir = -1;
    //     let raf: number;

    //     const animate = () => {
    //         pos += dir * 0.01;

    //         if (pos <= 42) dir = 1;
    //         if (pos >= 58) dir = -1;

    //         if (bgRef.current) {
    //             bgRef.current.style.backgroundPosition = `${pos}% center`;
    //         }

    //         raf = requestAnimationFrame(animate);
    //     };

    //     raf = requestAnimationFrame(animate);

    //     return () => cancelAnimationFrame(raf);
    // }, []);

    return (
        <div
            ref={bgRef}
            className="fixed inset-0 -z-10"
            style={{
                backgroundImage: "url('/assets/BG3.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "50% center",
            }}
        />
    );
}