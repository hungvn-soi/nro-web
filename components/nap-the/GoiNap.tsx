"use client"
import { formatNumber } from "@/utils/format";
import { Gem } from "lucide-react";
import { Sun } from "lucide-react";
import { useState } from "react";


export interface IDataBangGia {
    id: number,
    price: number,
    gem: number
}
interface IPops{
    data: IDataBangGia[]
    selectGoi: (price: number)=> void
}

const GoiNap = ({ selectGoi, data }: IPops) => {
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const handleSlectGoi = (price :number) => {
        setSelectedPrice(price);
        selectGoi(price)
    }

    return (
        <div className="border-2 border-amber-400 rounded-2xl pt-5 px-5  w-full mt-5 min-h-130">
            <h1 className="font-bold text-white uppercase   ">1. Chọn gói nạp</h1>
            <div>
                {
                   data.map((item) => (
                    
                       <button
                           key={item.id}
                           onClick={() => handleSlectGoi(item.price)}
                           className={`
                                w-full
                                group
                                flex items-center justify-between
                                h-11
                                px-4
                                mt-3
                                cursor-pointer
                                rounded-md
                                border
                                transition-all
                                duration-200
                                ${selectedPrice === item.price
                                                        ? `
                                        border-yellow-500
                                        bg-linear-to-b
                                        from-[#ffe97a]
                                        via-[#ffd42a]
                                        to-[#e7a500]
                                        shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_2px_4px_rgba(0,0,0,.35)]
                                        `
                                                        : `
                                        border-yellow-600
                                        bg-transparent
                                        hover:bg-linear-to-b
                                        hover:from-[#ffe97a]
                                        hover:via-[#ffd42a]
                                        hover:to-[#e7a500]
                                        hover:shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_2px_4px_rgba(0,0,0,.35)]
                                        `
                                                    }
                            `}
                       >
                           <div className="flex items-center gap-2">
                               <Gem
                                   className={`w-5 h-5 ${selectedPrice === item.price
                                           ? "text-[#3b2a00]"
                                           : "text-sky-500"
                                       }`}
                               />

                               <span
                                   className={`font-bold transition-colors ${selectedPrice === item.price
                                           ? "text-[#3b2a00]"
                                           : "text-white group-hover:text-[#3b2a00]"
                                       }`}
                               >
                                   {formatNumber(item.price)} VND
                               </span>
                           </div>

                           <span
                               className={`font-bold transition-colors ${selectedPrice === item.price
                                       ? "text-[#3b2a00]"
                                       : "text-yellow-400 group-hover:text-[#3b2a00]"
                                   }`}
                           >
                               {formatNumber(item.gem)} Ngọc
                           </span>
                       </button>
                    


                   ))
                }
                
                <div className="flex items-center gap-3 mt-5">
                    <Sun className="h-6 w-6 text-[#F5C542]" fill="#F5C542" />

                    <span
                        className="
                            text-xl
                            font-extrabold
                            italic
                            text-[#F5C542]
                            [text-shadow:1px_1px_0_#4b2d00]
                            "
                    >
                        Nạp càng nhiều - Ưu đãi càng lớn!
                    </span>
                </div>
            </div>
        </div>
    )
}

export default GoiNap


interface BuyButtonProps {
    price: number;
    gem: number;
    selectGoi: number
    onClick: (price:number) => void
}

const ButtonNap = ({ price, gem, onClick } : BuyButtonProps) => {
    return(
        <button
            className={`
                w-full
                group
                flex items-center justify-between
                h-11 px-4
                mt-3
                cursor-pointer
                rounded-md
                border border-yellow-600
                transition-all duration-200
                bg-transparent
                hover:bg-linear-to-b
                hover:from-[#ffe97a]
                hover:via-[#ffd42a]
                hover:to-[#e7a500]
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_2px_4px_rgba(0,0,0,.35)]
                `}
            
                onClick={() => onClick(price)}
        >
            <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-sky-500" />

                <span
                    className="
                    font-bold
                    text-white
                    transition-colors
                    group-hover:text-[#3b2a00]
                "
                >
                    {formatNumber(price)} VND
                </span>
            </div>

            <span
                className="
                    font-bold
                    text-yellow-400
                    transition-colors
                    group-hover:text-[#3b2a00]
                    "
                >
                {formatNumber(gem)} Ngọc
            </span>
        </button>
    )
}