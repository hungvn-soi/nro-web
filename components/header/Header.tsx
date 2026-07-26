"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginBTN from "../button/Login";
import RegisterBTN from "../button/Register";
import { useAuth } from "@/lib/context/AuthContext";
import MobileMenu from "../menu/MenuMobile";
import MenuPC from "../menu/MenuPc";
import { User } from "lucide-react"
import ProfileMenu from "../profile/ProfileMenu";


const Header = () => {
    const pathname = usePathname();
    const { user, openAuthModal, logout } = useAuth();

    const handleLogin =()=> {
        openAuthModal("login");
    }

    const handleDangKy = ()=>{
        openAuthModal("register");
    }

    const handleLogout = async () => {
        await logout()
    }


    return (
        <header className="sticky top-0 z-50 border-b border-yellow-500/30 backdrop-blur-[10px]">
            <div className="mx-auto lg:flex h-18 max-w-7xl items-center justify-end relative gap-[2%] hidden">
                {/* Logo */}
                <Link href="/" className="lg:absolute top-0 left-2.5">
                    <img
                        src="/assets/LogoMenu.webp"
                        alt="logo"
                        className="h-26 w-auto"
                    />
                </Link>

                <MenuPC />

                {/* Button */}
                <div className="flex items-center gap-3">
                
                    {
                        user ? (
                            <button
                                className="
                                    ml-5
                                    cursor-pointer
                                    h-10 rounded-xl border border-yellow-500/40
                                    bg-[#0d1b2d] px-5 text-sm font-semibold
                                    text-white transition hover:bg-[#13243c]
                                "
                                onClick={handleLogout}
                            >
                                Đăng Xuất
                            </button>
                        ) :
                        (
                            <>
                                <LoginBTN 
                                    action={handleLogin}
                                />
                                <RegisterBTN 
                                    action={handleDangKy}
                                />
                            </>
                        )
                    }
                </div>

            </div>

            <div className="flex justify-between items-center px-3 lg:hidden">
                <div> 
                    <MobileMenu />
                </div>

                <Link href="/" className=" top-0 left-2.5">
                    <img
                        src="/assets/LogoMenu.webp"
                        alt="logo"
                        className="h-15 w-auto"
                    />
                </Link>

                <div>
                    <ProfileMenu
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                        onRegister={handleDangKy}
                        user={user}
                    />
                </div>

            </div>
        </header>
    );
};

export default Header;