"use client"
import { use, useEffect, useState } from "react"
import CardHistory, { RechargeHistory } from "./CardHistory"
import GoiNap, { IDataBangGia } from "./GoiNap"
import HTTT from "./Hinh ThucThanhToan"
import { IPaymentHistory } from "@/types/payment"
import { useAuth } from "@/lib/context/AuthContext";

const BangGia: IDataBangGia[] = [
    { id: 1, price: 10000, gem: 100 },
    { id: 2, price: 20000, gem: 220 },
    { id: 3, price: 50000, gem: 560 },
    { id: 4, price: 100000, gem: 1200 },
    { id: 5, price: 200000, gem: 2500 },
    { id: 6, price: 500000, gem: 6000 },
    { id: 7, price: 1000000, gem: 14000 },
]

const NapTheClient = () => {
    const {user} = useAuth()
    const[pirce, setPirce] = useState<number>(0)
    const [historyNap, setHistoryNap] = useState < IPaymentHistory[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handlePriceSelect = (price: number) => (
        setPirce(price)
    )

    useEffect (() => {
        if(!user || !user.id) {
            setHistoryNap([]);
            return;
        }

        handleLoadHistoryPayment()


    }, [user])

    const handleLoadHistoryPayment = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(
                `/api/payment/history`, {
                method: "GET",
                cache: "no-store",
            }
            );

            const result = await res.json();
            console.log("history: ", result.data)
            if (!res.ok || !result.success) {
                alert(result.message || "Không thể lấy lịch sử thanh toán");
                return;
            }

            if (!result.data) {
                setHistoryNap([]);
                return;
            }
            setHistoryNap(result.data);

        } catch (error) {
            console.error(
                "GET payment history error:",
                error
            );

            alert("Có lỗi xảy ra khi lấy lịch sử thanh toán");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div>
            <div className="grid lg:grid-cols-[40%_60%] grid-cols-1 gap-3 lg:p-0 px-2">
                <GoiNap
                    data={BangGia}
                    selectGoi={handlePriceSelect}
                />
                <HTTT
                    bangGia={BangGia}
                    selectGiaGoi={pirce}
                    onReloadHistory={handleLoadHistoryPayment}
                />
            </div>

            <CardHistory
                data={historyNap}
            />
        </div>
    )
}

export default NapTheClient