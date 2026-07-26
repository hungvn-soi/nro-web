import { ReactNode } from "react";

interface DownloadItemProps {
    icon: ReactNode;
    title: string;
    subtitle: string;
    size?: string;
    buttonText: string;
    disabled?: boolean;
    onClick?: () => void;
}

export default function DownloadItem({
    icon,
    title,
    subtitle,
    size,
    buttonText,
    disabled,
    onClick,
}: DownloadItemProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#102543] md:px-6 px-2 py-5">
            <div className="flex items-center gap-5">
                <div className="text-5xl">{icon}</div>

                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-semibold text-white">{title}</h3>

                        {size && (
                            <span className="rounded bg-sky-500 px-2 py-1 text-xs text-white">
                                {size}
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-sm text-gray-300">{subtitle}</p>
                </div>
            </div>

            <button
                disabled={disabled}
                onClick={onClick}
                className={` rounded-lg md:px-7 px-2 py-3 font-bold transition
                ${disabled
                        ? "cursor-not-allowed bg-gray-500 text-white"
                        : "bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
                    }`}
            >
                {buttonText}
            </button>
        </div>
    );
}
