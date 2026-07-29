"use client";

import Image from "next/image";


interface ZaloButtonProps {
  phone?: string;
  href?: string;
}

const ZaloFloatingButton = ({
    phone = "0988 123 456",
    href = "https://zalo.me/g/pflsczmpcbslbypmftyi",
}: ZaloButtonProps) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="z-999 fixed bottom-24 right-5 group inline-flex items-center gap-3 rounded-xl bg-[#0A67D0] px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0056c7]"
        >
            {/* Logo */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
                <Image
                    src="/assets/LogoZalo.webp"
                    alt="Zalo"
                    width={34}
                    height={34}
                    className="object-contain"
                />
            </div>

            {/* Text */}
            <div className="leading-tight text-white">
                <p className="text-lg font-bold">Box Zalo</p>
                {/* <p className="text-sm font-semibold tracking-wide">{phone}</p> */}
            </div>
        </a>
    );
}

export default ZaloFloatingButton
