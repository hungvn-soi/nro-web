"use client"
import {
    FaWindows,
    FaAndroid,
    FaApple,
} from "react-icons/fa";
import { TbPackage } from "react-icons/tb";

const DownloadBanner = () => {
    const buttons = [
        {
            icon: <FaWindows className="w-[22px] h-[22px]" />,
            label: "WINDOWS",
            link:"link dowload windows"
        },
        {
            icon: <FaAndroid size={22} className="text-lime-400" />,
            label: "ANDROID",
            link: "link dowload android"

        },
        {
            icon: <TbPackage size={22} className="text-yellow-400" />,
            label: "APK",
            link: "link dowload APK"

        },
        {
            icon: <FaApple size={22} />,
            label: "IOS",
            link: "link dowload IOS"

        },
    ];

    const handleClickDowLoad = (link:string) =>{
        alert(` redirect: ${link}`)
    }

    return (
        <section className="relative overflow-hidden  px-6 lg:pt-35">

            <div className="relative z-10 mx-auto max-w-5xl text-center md:top-0 mt-[50px]">
                {/* Title */}
                <h1
                    className="
                        text-[50px]
                        md:text-7xl
                        font-black
                        uppercase
                        tracking-wide
                        bg-gradient-to-b
                        from-yellow-200
                        via-yellow-400
                        to-orange-500
                        bg-clip-text
                        text-transparent
                        drop-shadow-[0_4px_0_#7a3d00]
                        [text-shadow:0_0_18px_rgba(255,200,0,.45)]
                    "
                >
                    TẢI GAME
                </h1>

                <h2
                    className="
                        md:mt-2
                        text-xl
                        md:text-5xl
                        font-extrabold
                        uppercase
                        tracking-wide
                        text-slate-100
                        drop-shadow-[0_3px_0_#1e293b]
                    "
                >
                    NGỌC RỒNG ZENZ
                </h2>

                {/* Subtitle */}
                <div className="mt-5 space-y-1 text-slate-200 lg:block hidden">
                    <p className="text-lg">
                        Trải nghiệm thế giới Ngọc Rồng
                    </p>

                    <p className="text-base text-slate-300">
                        Server ổn định - Không lag - Chơi cực đã
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 ">
                    {buttons.map((item) => (
                        <button
                            key={item.label}
                            className="
                                group
                                flex
                                items-center
                                justify-center
                                gap-3
                                rounded-xl
                                border
                                border-[#5e7ca7]
                                bg-[#102748]
                                lg:py-4
                                py-2
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-yellow-400
                                hover:bg-[#16355f]
                                hover:shadow-[0_0_20px_rgba(255,210,0,.35)]
                            "
                            onClick={()=> handleClickDowLoad(item.link)}
                        >
                            {item.icon}

                            <span className="tracking-wide">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default DownloadBanner
