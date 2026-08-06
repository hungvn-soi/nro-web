"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
    Flag,
} from "lucide-react";

const menus = [
    { name: "Trang chủ", href: "/", icon: House },
    { name: "Tải game", href: "/download", icon: Download },
    { name: "Nạp thẻ", href: "/nap-the", icon: Gem },
    { name: "Sự kiện", href: "/event", icon: Gift },
    // { name: "BXH", href: "/ranking", icon: Trophy },
    { name: "Báo lỗi", href: "/report", icon: Flag },
    { name: "Hướng dẫn", href: "/guide", icon: CircleHelp },
    { name: "Liên hệ", href: "/contact", icon: Mail },
];

const MobileMenu = () => {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll khi mở menu
    useEffect(() => {
        if (!mounted) return;

        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open, mounted]);

    return (
        <>
            {/* Toggle */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="lg:hidden p-2 text-white"
            >
                <Menu size={28} />
            </button>

            {mounted &&
                createPortal(
                    <>
                        {/* Overlay */}
                        <div
                            onClick={() => setOpen(false)}
                            className={`fixed inset-0 z-[999] bg-black/60 transition-opacity duration-300 ${open
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible pointer-events-none"
                                }`}
                        />

                        {/* Drawer */}
                        <aside
                            role="dialog"
                            aria-modal="true"
                            className={`fixed left-0 top-0 bottom-0 z-[1000] h-screen w-[280px] overflow-y-auto bg-slate-900 p-5 text-white transform transition-transform duration-300 ease-in-out ${open
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                }`}
                        >
                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <Link
                                    href="/"
                                    onClick={() => setOpen(false)}
                                >
                                    <Image
                                        src="/assets/LogoMenu.webp"
                                        alt="Logo"
                                        width={120}
                                        height={55}
                                        className="w-full"
                                        priority
                                    />
                                </Link>

                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="text-white transition hover:opacity-80"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Menu */}
                            <nav className="space-y-1">
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
                                            onClick={() => setOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-3 transition ${active
                                                    ? "bg-white/10 font-medium text-yellow-400"
                                                    : "text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <Icon
                                                size={18}
                                                className={
                                                    active
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />

                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="my-5 border-t border-white/15" />

                            {/* Auth */}
                            {/* <div className="space-y-2">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-white transition hover:bg-white/5"
                                >
                                    <User size={18} />
                                    <span>Đăng nhập</span>
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg bg-yellow-400 py-3 text-center font-semibold text-black transition hover:bg-yellow-300"
                                >
                                    Đăng ký
                                </Link>
                            </div> */}
                        </aside>
                    </>,
                    document.body
                )}
        </>
    );
}

export default MobileMenu
