"use client";

import {
    LayoutDashboard,
    Server,
    Users,
    UserRound,
    Package,
    ShoppingBag,
    ClipboardList,
    CalendarDays,
    Skull,
    Map,
    UsersRound,
    Settings,
    Globe,
    CreditCard,
    Image,
    Bell,
    Wrench,
    Shield,
    FileClock,
    DatabaseBackup,
    Cog,
    ChevronDown,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";

type MenuItem = {
    title: string;
    href: string;
    icon: React.ElementType;
};

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
    // {
    //     title: "TỔNG QUAN",
    //     items: [
    //         {
    //             title: "Dashboard",
    //             href: "/admin",
    //             icon: LayoutDashboard,
    //         },
    //         {
    //             title: "Thông tin server",
    //             href: "/admin/server",
    //             icon: Server,
    //         },
    //     ],
    // },

    // {
    //     title: "QUẢN LÝ",
    //     items: [
    //         {
    //             title: "Người chơi",
    //             href: "/admin/players",
    //             icon: Users,
    //         },
    //         {
    //             title: "Nhân vật",
    //             href: "/admin/characters",
    //             icon: UserRound,
    //         },
    //         {
    //             title: "Vật phẩm",
    //             href: "/admin/items",
    //             icon: Package,
    //         },
    //         {
    //             title: "Shop / Cửa hàng",
    //             href: "/admin/shop",
    //             icon: ShoppingBag,
    //         },
    //         {
    //             title: "Nhiệm vụ",
    //             href: "/admin/quests",
    //             icon: ClipboardList,
    //         },
    //         {
    //             title: "Sự kiện",
    //             href: "/admin/events",
    //             icon: CalendarDays,
    //         },
    //         {
    //             title: "Boss",
    //             href: "/admin/boss",
    //             icon: Skull,
    //         },
    //         {
    //             title: "Bản đồ",
    //             href: "/admin/maps",
    //             icon: Map,
    //         },
    //         {
    //             title: "Bang hội",
    //             href: "/admin/guilds",
    //             icon: UsersRound,
    //         },
    //     ],
    // },

    {
        title: "CẤU HÌNH",
        items: [
            // {
            //     title: "Cấu hình game",
            //     href: "/admin/settings/game",
            //     icon: Settings,
            // },
            {
                title: "Cấu hình web",
                href: "/admin/settings/web",
                icon: Globe,
            },
            {
                title: "Gói Nạp",
                href: "/admin/goi-nap",
                icon: CreditCard,
            },
            {
                title: "Lịch sử thanh toán",
                href: "/admin/payment",
                icon: Image,
            },
            {
                title: "Thông báo",
                href: "/admin/notifications",
                icon: Bell,
            },
            {
                title: "Bảo trì",
                href: "/admin/maintenance",
                icon: Wrench,
            },
        ],
    },

    // {
    //     title: "HỆ THỐNG",
    //     items: [
    //         {
    //             title: "Tài khoản admin",
    //             href: "/admin/accounts",
    //             icon: UserRound,
    //         },
    //         {
    //             title: "Phân quyền",
    //             href: "/admin/permissions",
    //             icon: Shield,
    //         },
    //         {
    //             title: "Nhật ký hoạt động",
    //             href: "/admin/logs",
    //             icon: FileClock,
    //         },
    //         {
    //             title: "Sao lưu dữ liệu",
    //             href: "/admin/backup",
    //             icon: DatabaseBackup,
    //         },
    //         {
    //             title: "Cài đặt hệ thống",
    //             href: "/admin/settings",
    //             icon: Cog,
    //         },
    //     ],
    // },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="
                fixed left-0 top-0 z-50
                h-screen w-64
                overflow-y-auto
                border-r border-[#273346]
                bg-[#0b1524]
                text-white

                scrollbar-thin
                scrollbar-thumb-[#26354b]
            "
        >
            {/* Logo */}
            <div className="flex h-[70px] items-center gap-2 px-4">
                {/* Thay bằng logo thật của bạn */}
                <div
                    className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br from-[#ffdf00] to-[#ff8a00]
                    text-[13px] font-black
                    text-[#172235]
                "
                >
                    ZENZ
                </div>

                <div className="leading-none">
                    <div className="text-[20px] font-extrabold tracking-tight text-[#ffb900]">
                        ZENZ
                    </div>

                    <div className="mt-[5px] text-[9px] font-semibold tracking-wide text-[#9ca8bb]">
                        ADMIN PANEL
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="px-2 pb-6">
                {menuGroups.map((group) => (
                    <div key={group.title} className="mb-3">
                        {/* Group title */}
                        <div
                            className="
                            mb-1.5 px-2
                            text-[18px]
                            font-bold
                            tracking-wide
                            text-white
                        "
                        >
                            {group.title}
                        </div>

                        {/* Items */}
                        <div className="space-y-[2px]">
                            {group.items.map((item) => {
                                const Icon = item.icon;

                                const active =
                                    item.href === "/admin"
                                        ? pathname === "/admin"
                                        : pathname.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                                        group
                                        flex h-[30px]
                                        items-center gap-[9px]
                                        rounded-[5px]
                                        px-[9px]
                                        text-[15px]
                                        transition-all duration-150

                                        ${active
                                            ? "bg-gradient-to-r from-[#304a78] to-[#273d65] text-white"
                                            : "text-[#c4ccd8] hover:bg-[#17263c] hover:text-white"
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={14}
                                            strokeWidth={1.7}
                                            className={`
                                            shrink-0
                                            ${active
                                                    ? "text-white"
                                                    : "text-[#aeb8c8] group-hover:text-white"
                                                }
                                            `}
                                        />

                                        <span className="truncate text-white">
                                            {item.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}