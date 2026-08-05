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
    const [selectGoiUI, setSelectGoiUI] = useState<IDataBangGia | null>(null)

    const handleSlectGoi = (item :IDataBangGia) => {
        setSelectedPrice(item.price);
        selectGoi(item.price)
        setSelectGoiUI(item)
    }

    return (
        <div className="border-2 border-amber-400 rounded-2xl pt-5 px-5  w-full mt-5 min-h-130">
            <h1 className="font-bold text-white uppercase   ">1. Chọn gói nạp</h1>
            <div>
                {
                   data.map((item) => (
                       <button
                           key={item.id}
                           onClick={() => handleSlectGoi(item)}
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
                                   {formatNumber(item.price)} VNĐ
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
                
                <div className="grid grid-cols-2 gap-3 border border-blue-700/50 bg-[#0b2452] mt-3 rounded-md text-white py-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Bạn đang nạp</p>
                        <div className="font-bold">{formatNumber(selectGoiUI?.price || 0)} VNĐ</div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Ngọc thực nhận</p>
                        <div className="font-bold text-yellow-500">{formatNumber(selectGoiUI?.gem || 0)} Ngọc</div>
                    </div>
                </div>



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
