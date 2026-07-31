"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
    question: string;
    answer: string;
}

export default function GuideFAQ({
    question,
    answer,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-700 bg-[#5253534a]">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between p-5 text-white transition hover:bg-zinc-600"
            >
                <span className="font-semibold">
                    {question}
                </span>

                <ChevronDown
                    className={`text-zinc-300 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="border-t border-zinc-700 p-5 leading-7 text-zinc-300">
                    {answer}
                </div>
            )}
        </div>
    );
}