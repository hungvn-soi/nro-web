import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { Gift, Server, Star, Users } from "lucide-react";

interface StatItemProps {
    icon: LucideIcon;
    labelTop: string;
    value: string | number;
    labelBottom: string;
    showBorder: boolean;
}

const STATS = [
    {
        id: "online",
        icon: Users,
        labelTop: "ONLINE",
        value: "1.523",
        labelBottom: "NGƯỜI",
    },
    {
        id: "server",
        icon: Server,
        labelTop: "SERVER",
        value: "5",
        labelBottom: "MÁY CHỦ",
    },
    {
        id: "level",
        icon: Star,
        labelTop: "LEVEL MAX",
        value: "250",
        labelBottom: "CẤP",
    },
    {
        id: "event",
        icon: Gift,
        labelTop: "SỰ KIỆN",
        value: "X2 EXP",
        labelBottom: "CUỐI TUẦN",
    },
] as const;

const StatItem = memo(function StatItem({
    icon: Icon,
    labelTop,
    value,
    labelBottom,
    showBorder,
}: StatItemProps) {
    return (
        <div
            className={`
                flex items-center justify-center gap-4
                px-4 py-4
                ${showBorder ? "md:border-r md:border-cyan-500/20" : ""}
            `}
        >
            {/* Icon */}
            <div
                className="
                    relative flex h-14 w-14 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-b
                    from-sky-500/30
                    to-blue-900/50
                    p-0.5
                    ring-1 ring-cyan-400/40
                    shadow-[0_0_15px_rgba(14,165,233,.3)]
                "
            >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950/60">
                    <Icon
                        aria-hidden
                        className={`h-6 w-6 text-white ${Icon === Star ? "fill-white" : ""
                            }`}
                    />
                </div>
            </div>

            {/* Text */}
            <div className="flex flex-col text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                    {labelTop}
                </span>

                <span className="text-2xl font-black tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,.8)]">
                    {value}
                </span>

                <span className="text-xs font-medium uppercase tracking-wider text-cyan-200/60">
                    {labelBottom}
                </span>
            </div>
        </div>
    );
});

function ServerStatsBar() {
    return (
        <section className="mx-auto w-full max-w-5xl p-4">
            <div
                className="
                    relative overflow-hidden rounded-xl
                    border border-cyan-500/40
                    bg-slate-950/60
                    backdrop-blur-md
                    shadow-[0_0_20px_rgba(6,182,212,.15)]
                "
            >
                {/* Top line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                {/* Stats */}
                <div className="grid grid-cols-2 divide-y divide-cyan-500/20 sm:grid-cols-2 md:grid-cols-4 md:divide-y-0">
                    {STATS.map((stat, index) => (
                        <StatItem
                            key={stat.id}
                            icon={stat.icon}
                            labelTop={stat.labelTop}
                            value={stat.value}
                            labelBottom={stat.labelBottom}
                            showBorder={index !== STATS.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default memo(ServerStatsBar);