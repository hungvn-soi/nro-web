"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    X,
    User,
    Menu,
    House,
    Download,
    Gem,
    Gift,
    Trophy,
    CircleHelp,
    Mail,
} from "lucide-react";

const menus = [
    { name: "Trang chủ", href: "/", icon: House },
    { name: "Tải game", href: "/download", icon: Download },
    { name: "Nạp thẻ", href: "/nap-the", icon: Gem },
    { name: "Sự kiện", href: "/event", icon: Gift },
    { name: "BXH", href: "/ranking", icon: Trophy },
    { name: "Hướng dẫn", href: "/guide", icon: CircleHelp },
    { name: "Liên hệ", href: "/contact", icon: Mail },
];

const MenuPC = () => {
    const pathname = usePathname();

    return(
        <nav className="flex items-center gap-5">
            {menus.map((item) => {
                const active =
                    item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
                                    relative flex h-18 items-center
                                    text-[18px]
                                    font-semibold
                                    transition-all duration-300


                                    ${active
                                ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                                : "text-white hover:text-yellow-400"
                            }
                                    after:absolute
                                    after:bottom-0
                                    after:left-1/2
                                    after:-translate-x-1/2
                                    after:h-0.75
                                    after:rounded-full
                                    after:bg-linear-to-r
                                    after:from-transparent
                                    after:via-yellow-400
                                    after:to-transparent
                                    after:shadow-[0_0_12px_3px_rgba(250,204,21,0.5)]
                                    after:transition-all
                                    after:duration-500
                                    ${active
                                ? "after:w-full"
                                : "after:w-0 hover:after:w-full"
                            }
                                `}
                    >
                        <Icon
                            size={18}
                            className={
                                active
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }
                        />

                        <p className="ml-2">{item.name}</p>
                    </Link>
                );
            })}
        </nav>
    )
}

export default MenuPC