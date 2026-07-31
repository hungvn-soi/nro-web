"use client";

import { memo, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Gift, Server, Star, Users } from "lucide-react";
import { IServerStatus } from "@/types/serverStatus";

interface StatItemProps {
    icon: LucideIcon;
    labelTop: string;
    value: string | number;
    labelBottom: string;
    showBorder: boolean;
}

interface IStat {
    id: string;
    icon: LucideIcon;
    labelTop: string;
    value: string;
    labelBottom: string;
}

const STATS = [
    {
        id: "online",
        icon: Users,
        labelTop: "ONLINE",
        value: "",
        labelBottom: "NGƯỜI",
    },
    {
        id: "server",
        icon: Server,
        labelTop: "SERVER",
        value: "",
        labelBottom: "MÁY CHỦ",
    },
    {
        id: "level",
        icon: Star,
        labelTop: "LEVEL MAX",
        value: "",
        labelBottom: "CẤP",
    },
    {
        id: "event",
        icon: Gift,
        labelTop: "SỰ KIỆN",
        value: "",
        labelBottom: "CUỐI TUẦN",
    },
] as const;

export interface ITopLevelProps {
    level: number;
    nameLevel: string;
}

interface IServerBarProps {
    severInfo: IServerStatus | null;
    topLevel: ITopLevelProps | null;
}

function ServerStatsBar({
    severInfo,
    topLevel,
}: IServerBarProps) {
    const [server, setServer] = useState(severInfo);

    useEffect(() => {
        const loadServerStatus = async () => {
            console.log("call api lấy status")
            try {
                const res = await fetch("/api/server-status", {
                    cache: "no-store",
                });

                if (!res.ok) return;

                setServer(await res.json());
            } catch (err) {
                console.error(err);
            }
        };

        let intervalId: ReturnType<typeof setInterval>;

        // Sau 6 giây gọi lần đầu
        const timeoutId = setTimeout(() => {
            loadServerStatus();

            // Sau đó cứ 3 phút gọi tiếp
            intervalId = setInterval(loadServerStatus, 2 * 60 * 1000);
        }, 3000);

        return () => {
            clearTimeout(timeoutId);

            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const stats: IStat[] = useMemo(() => {
        return STATS.map((item) => ({
            ...item,
            value:
                item.id === "online"
                    ? server?.playersOnline.toLocaleString() ?? "0"
                    : item.id === "server"
                        ? server?.online
                            ? "Online"
                            : "Offline"
                        : item.id === "level"
                            ? topLevel?.level.toLocaleString() ?? "20"
                            : "X2 EXP",
        }));
    }, [server, topLevel]);

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
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="grid grid-cols-2 divide-y divide-cyan-500/20 sm:grid-cols-2 md:grid-cols-4 md:divide-y-0">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.id}
                            icon={stat.icon}
                            labelTop={stat.labelTop}
                            value={stat.value}
                            labelBottom={stat.labelBottom}
                            showBorder={index !== stats.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

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
            <div
                className="
                    relative flex h-14 w-14 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-linear-to-b
                    from-sky-500/30
                    to-blue-900/50
                    p-0.5
                    ring-1 ring-cyan-400/40
                    shadow-[0_0_15px_rgba(14,165,233,.3)]
                "
            >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950/60">
                    <Icon
                        className={`h-6 w-6 text-white ${Icon === Star ? "fill-white" : ""
                            }`}
                    />
                </div>
            </div>

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

export default memo(ServerStatsBar);