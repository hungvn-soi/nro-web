import { memo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";

interface NewsCardProps {
    href?: string;
    image: string | StaticImageData;
    title: string;
    badge?: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
}

function NewsCard({
    href = "#",
    image,
    title,
    badge,
    description,
    startDate,
    endDate
}: NewsCardProps) {
    return (
        <Link
            href={href}
            className="
                group
                flex
                gap-4
                rounded-xl
                border
                border-transparent
                bg-[#0b1d35]/90
                transition-all
                duration-300
                hover:border-[#ffb347]
                hover:bg-[#102749]
                hover:shadow-lg
                hover:shadow-blue-900/30
            "
        >
            {/* Image */}
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={image || "/assets/eventbaner.webp"}
                    alt={title}
                    fill
                    sizes="140px"
                    className="object-none transition-transform duration-300 group-hover:scale-105 rounded-xl"
                />
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="line-clamp-1 text-lg font-bold uppercase text-white">
                            {title}
                        </h2>

                        {badge && (
                            <span className="shrink-0 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                {badge}
                            </span>
                        )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
                        {description}
                    </p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <Clock3
                        aria-hidden
                        className="h-4 w-4 shrink-0"
                    />

                    <time>{startDate} - {endDate}</time>
                </div>
            </div>
        </Link>
    );
}

export default memo(NewsCard);