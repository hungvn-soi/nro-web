"use client"
import {
    FaWindows,
    FaAndroid,
    FaApple,
} from "react-icons/fa";
import { TbPackage } from "react-icons/tb";

const buttons = [
    {
        id:"pc",
        icon: <FaWindows className="w-[22px] h-[22px]" />,
        label: "WINDOWS",
        link: "https://drive.google.com/file/d/1wDiUU9Un-KXT2kf1GTCffDM3rYeQ4tLh/view?usp=sharing"
    },
    {
        id: "android",
        icon: <FaAndroid size={22} className="text-lime-400" />,
        label: "ANDROID",
        link: "https://drive.google.com/file/d/1RwgLJ_jwa7TuYRWf-xka-OAwKGzN92FP/view?usp=sharing"

    },
    {
        id: "apk",
        icon: <TbPackage size={22} className="text-yellow-400" />,
        label: "APK",
        link: "https://drive.google.com/file/d/1RwgLJ_jwa7TuYRWf-xka-OAwKGzN92FP/view?usp=sharing"

    },
    {
        id:"ios",
        icon: <FaApple size={22} />,
        label: "IOS",
        link: "Chúng tôi đang phát triển cho bản IOS..."

    },
];

const DownloadBanner = () => {


    const handleClickDowLoad = (id:string, link:string) =>{
        if(id === "ios")
            return alert("IOS chungs tôi đang phát triển")

        window.open(link, "_blank", "noopener,noreferrer");
    }

    return (
        <section className="lg:mt-[50px] lg:m-0 my-2">

            <div className="flex flex-col justify-around items-center top-0 lg:mt-[50px]">
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
                                cursor-pointer
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
                                p-2
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-yellow-400
                                hover:bg-[#16355f]
                                hover:shadow-[0_0_20px_rgba(255,210,0,.35)]
                            "
                            onClick={()=> handleClickDowLoad(item.id, item.link)}
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
