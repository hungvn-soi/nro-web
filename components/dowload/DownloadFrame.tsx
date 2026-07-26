import { ReactNode } from "react";
import TitlePageDowload from "./title";

interface DownloadFrameProps {
    title: string;
    children: ReactNode;
}

export default function DownloadFrame({
    title,
    children,
}: DownloadFrameProps) {
    return (
        <div className="relative p-5 w-full rounded-2xl border border-yellow-500/40 bg-[#081A33] shadow-xl">
            {/* Title */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <TitlePageDowload
                    title={title}
                />
            </div>

            <div className="mt-8 space-y-4">{children}</div>
        </div>
    );
}
