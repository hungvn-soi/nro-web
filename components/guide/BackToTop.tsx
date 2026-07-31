"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {

        const handle = () => {

            setShow(window.scrollY > 400);

        };

        window.addEventListener("scroll", handle);

        return () =>
            window.removeEventListener("scroll", handle);

    }, []);

    if (!show) return null;

    return (

        <button
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            className="fixed bottom-6 right-6 rounded-full bg-yellow-500 p-4 text-black shadow-lg"
        >

            <ArrowUp />

        </button>

    );
}