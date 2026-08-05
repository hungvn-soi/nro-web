"use client"
import { ChevronDown, ShieldCheck } from "lucide-react";
import { IDataBangGia } from "./GoiNap";
import { useEffect, useState } from "react";
import { formatNumber } from "@/utils/format";

interface IPops {
    dataBangGia: IDataBangGia[]
    selectGiaGoi: number
}
const CardRecharge = ({ dataBangGia, selectGiaGoi }: IPops) => {
    const [price, setPrice] = useState<number>(0)

    useEffect(()=>{
        if(!selectGiaGoi) return
        setPrice(selectGiaGoi)

    },[selectGiaGoi])


    return (
        
        <div className="w-full rounded-xl bg-[#071a2f] p-4 text-white">
            {/* Nhà mạng */}
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-200">
                    Chọn nhà mạng
                </label>

                <div className="relative">
                    <select  className="h-12 w-full appearance-none rounded-lg border border-[#28415f] bg-[#091b32] px-4 text-white outline-none transition focus:border-yellow-400">
                        <option>Viettel</option>
                        <option>Vinaphone</option>
                        <option>Mobifone</option>
                    </select>

                    <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>

            {/* Mệnh giá */}
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-200">
                    Chọn mệnh giá
                </label>

                <div className="flex items-center">
                    <div className="h-12 w-full rounded-lg border border-[#28415f] bg-[#091b32] px-4 text-white">
                        {formatNumber(selectGiaGoi)} VNĐ
                    </div>
                </div>
            </div>

            {/* Serial + Mã thẻ */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-200">
                        Nhập số serial
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập số serial trên thẻ"
                        className="h-12 w-full rounded-lg border border-[#28415f] bg-[#091b32] px-4 placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-200">
                        Nhập mã thẻ
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập mã thẻ cào"
                        className="h-12 w-full rounded-lg border border-[#28415f] bg-[#091b32] px-4 placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* Button */}
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffc107] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#ffcf33] active:scale-[0.98]">
                <ShieldCheck size={20} />
                NẠP THẺ NGAY
            </button>
        </div>
    );
}

export default CardRecharge