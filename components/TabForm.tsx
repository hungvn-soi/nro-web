"use client";

import { ReactNode, useState } from "react";

export interface IFormTab {
    id: string;
    label: string;
    content: ReactNode;
}

interface TabsFormProps {
    data: IFormTab[];
    className?: string;
}

export default function TabsForm({
    data,
    className,
}: TabsFormProps) {
    if (data.length === 0) return null;

    const [activeTab, setActiveTab] = useState(
        data[0].id
    );

    const activeIndex = Math.max(
        data.findIndex(tab => tab.id === activeTab),
        0
    );

    const activeContent = data.find(
        tab => tab.id === activeTab
    );

    return (
        <div className="mx-auto mt-4">
            <div className="relative flex overflow-hidden rounded-full border-2 border-gray-700">

                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-amber-300 transition-transform duration-300"
                    style={{
                        width: `${100 / data.length}%`,
                        transform: `translateX(${activeIndex * 100}%)`,
                    }}
                />

                {data.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer relative z-10 flex-1 py-3 font-semibold uppercase transition-colors ${activeTab === tab.id
                                ? "text-black"
                                : "text-white hover:text-yellow-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                className={`rounded-2xl border border-gray-700 ${className ?? ""}`}
            >
                {activeContent?.content}
            </div>
        </div>
    );
}