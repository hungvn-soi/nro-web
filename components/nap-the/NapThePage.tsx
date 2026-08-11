"use client"
import { use, useEffect, useState } from "react"
import CardHistory, { RechargeHistory } from "./CardHistory"
import GoiNap from "./GoiNap"
import HTTT from "./Hinh ThucThanhToan"
import { IPaymentHistory } from "@/types/payment"
import { useAuth } from "@/lib/context/AuthContext";
import { IRechargePackageClient } from "@/types/rechargePackage"
interface INapTheProps {
    RechargePackage: IRechargePackageClient[]
}

const NapTheClient = ({ RechargePackage }:INapTheProps) => {
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
            // console.log("history: ", result.data)
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
                    dataGoiNap={RechargePackage}
                    selectGoi={handlePriceSelect}
                />
                <HTTT
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