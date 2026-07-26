"use client"
import BannerForm from "@/components/BannerForm"
import CardHistory, { RechargeHistory } from "@/components/nap-the/CardHistory";
import GoiNap, { IDataBangGia } from "@/components/nap-the/GoiNap"
import HTTT from "@/components/nap-the/Hinh ThucThanhToan";
import { useState } from "react";


const BangGia: IDataBangGia[] = [
    { id: 1, price: 10000, gem: 100 },
    { id: 2, price: 20000, gem: 220 },
    { id: 3, price: 50000, gem: 560 },
    { id: 4, price: 100000, gem: 1200 },
    { id: 5, price: 200000, gem: 2500 },
    { id: 6, price: 500000, gem: 6000 },
    { id: 7, price: 1000000, gem: 14000 },
]
const historyLsthanhtoan: RechargeHistory[] = [
    {
        id: 1,
        amount: "100.000 VND",
        gem: "1.200 Ngọc",
        method: "Thẻ Viettel",
        time: "20/07/2026 10:23",
        status: "success",
    },
    {
        id: 2,
        amount: "50.000 VND",
        gem: "560 Ngọc",
        method: "MoMo",
        time: "19/07/2026 15:45",
        status: "success",
    },
    {
        id: 3,
        amount: "20.000 VND",
        gem: "220 Ngọc",
        method: "Thẻ Vinaphone",
        time: "18/07/2026 09:12",
        status: "success",
    },
    {
        id: 4,
        amount: "10.000 VND",
        gem: "100 Ngọc",
        method: "Thẻ Viettel",
        time: "17/07/2026 21:30",
        status: "success",
    },
    {
        id: 5,
        amount: "50.000 VND",
        gem: "560 Ngọc",
        method: "Banking",
        time: "16/07/2026 11:05",
        status: "failed",
    },
]

const Napthe = () => {
    const[pirce, setPirce] = useState<number>(0)

    const handlePriceSelect = (price: number) => (
        setPirce(price)
    )
    return (
        <div className="">
            <BannerForm />
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[40%_60%] grid-cols-1 gap-3 lg:p-0 px-2">
                    <GoiNap
                        data={BangGia} 
                        selectGoi={handlePriceSelect}
                    />
                    <HTTT 
                        bangGia={BangGia}
                        selectGiaGoi={pirce}
                    />
                </div>

                <CardHistory 
                    data={historyLsthanhtoan}
                />
            </div>
        </div>
    )
}

export default Napthe