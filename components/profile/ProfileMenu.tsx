"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";

interface ProfileMenuProps {
    user?: any;
    onLogin: () => void;
    onRegister: () => void;
    onLogout: () => void;
}

export default function ProfileMenu({
    user,
    onLogin,
    onRegister,
    onLogout,
}: ProfileMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/40 bg-[#0d1b2d] text-white transition hover:bg-[#13243c]"
            >
                <User className="h-5 w-5" />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl border border-[#28415f] bg-[#091b32] shadow-xl">
                    {user ? (
                        <>
                            <div className="border-b border-[#28415f] px-4 py-3">
                                <p className="text-sm font-semibold text-white">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user.email}
                                </p>
                            </div>

                            <button
                                className="w-full px-4 py-3 text-left text-white transition hover:bg-[#13243c]"
                            >
                                Hồ sơ
                            </button>

                            <button
                                className="w-full px-4 py-3 text-left text-red-400 transition hover:bg-[#13243c]"
                                onClick={() => {
                                    onLogout();
                                    setOpen(false);
                                }}
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="w-full px-4 py-3 text-left text-white transition hover:bg-[#13243c]"
                                onClick={() => {
                                    onLogin();
                                    setOpen(false);
                                }}
                            >
                                Đăng nhập
                            </button>

                            <button
                                className="w-full px-4 py-3 text-left text-white transition hover:bg-[#13243c]"
                                onClick={() => {
                                    onRegister();
                                    setOpen(false);
                                }}
                            >
                                Đăng ký
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}