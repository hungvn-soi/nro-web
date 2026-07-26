"use client"
import Link from "next/link";
import {
    
    MessageCircle,
    
    Music2,
    ArrowUp,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-[#081c33] border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo */}
                    <div>
                        <img
                            src="/assets/LogoMenu.webp"
                            alt="Ngọc Rồng Zenz"
                            className="h-20 w-auto"
                        />

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
                            Ngọc Rồng Zenz - Máy chủ Dragon Ball chất lượng cao, ổn định,
                            lâu dài và không ngừng phát triển.
                        </p>

                        <div className="mt-6 flex gap-3">
                            {/* <SocialButton>
                                <Facebook size={18} />
                            </SocialButton> */}

                            <SocialButton>
                                <MessageCircle size={18} />
                            </SocialButton>
{/* 
                            <SocialButton>
                                <Youtube size={18} />
                            </SocialButton> */}

                            <SocialButton>
                                <Music2 size={18} />
                            </SocialButton>
                        </div>
                    </div>

                    {/* Liên kết */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold uppercase text-white">
                            Liên kết nhanh
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <FooterLink href="/">Trang chủ</FooterLink>
                            <FooterLink href="/download">Tải game</FooterLink>
                            <FooterLink href="/nap-the">Nạp thẻ</FooterLink>
                            <FooterLink href="/event">Sự kiện</FooterLink>
                            <FooterLink href="/ranking">Bảng xếp hạng</FooterLink>
                        </ul>
                    </div>

                    {/* Hỗ trợ */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold uppercase text-white">
                            Hỗ trợ
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <FooterLink href="/guide">Hướng dẫn</FooterLink>
                            <FooterLink href="/faq">FAQ</FooterLink>
                            <FooterLink href="/rules">Quy định</FooterLink>
                            <FooterLink href="/contact">Liên hệ</FooterLink>
                            <FooterLink href="/report">Báo lỗi</FooterLink>
                        </ul>
                    </div>

                    {/* Fanpage */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold uppercase text-white">
                            Fanpage
                        </h3>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                            <div className="flex gap-4">
                                <img
                                    src="/assets/Card/card1.png"
                                    alt=""
                                    className="h-20 w-20 rounded-xl object-cover"
                                />

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-white">
                                            Ngọc Rồng Zenz
                                        </h4>

                                        <p className="text-sm text-gray-400">
                                            @ngocrongzenz.official
                                        </p>
                                    </div>

                                    <button className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
                                        Theo dõi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row">
                    <p>© 2024 Ngọc Rồng Zenz. All Rights Reserved.</p>

                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">
                            Chính sách bảo mật
                        </Link>

                        <Link href="/terms" className="hover:text-white">
                            Điều khoản sử dụng
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Top */}

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className=" cursor-pointer fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition hover:bg-blue-500 z-999"
            >
                <ArrowUp size={22} />
            </button>
        </footer>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="transition duration-200 hover:text-white"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialButton({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-blue-500 hover:bg-blue-600 ">
            {children}
        </button>
    );
}