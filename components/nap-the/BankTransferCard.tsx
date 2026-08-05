"use client";

import {AlertTriangle, Loader2, QrCode, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useEffect, useState } from "react";
import LoadingOverlay from "../LoadingOverlay";
import Countdown from "../Countdown";

interface Props {
    accountName: string;
    accountNumber: string;
    amount:number;
}

type PaymentStatus =
    | "idle"
    | "creating"
    | "pending"
    | "success"
    | "failed"
    | "expired";

export default function BankTransferCard({
    accountName,
    accountNumber,
    amount,
}: Props) {
    const { user } = useAuth()
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
    const [qrCode, setQrCode] = useState("");
    const [expireQrCode, setEpireQrCode] = useState<string>("")
    const [orderCode, setOrderCode] = useState<string>("")

    useEffect (()=> {
        if(amount <= 0) return
    }, [amount])




    const handleClickQRcode = async () => {
        if (!user) {
            alert("Bạn vui lòng đăng nhập");
            return;
        }

        if (amount <= 0) {
            alert("Vui lòng chọn gói thanh toán");
            return;
        }

        try {
            setPaymentStatus("creating");

            const res = await fetch("/api/payment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount
                }),
            });

            const result = await res.json();

            if (!result.success) {
                setPaymentStatus("failed");
                return;
            }

            setQrCode(result.data.qrUrl);

            setOrderCode(result.data.orderCode)
            // QR đã tạo thành công -> chờ thanh toán
            setPaymentStatus("pending");

            //Set time off QR
            setEpireQrCode(result.data.expiredAt)

        } catch (err) {
            console.error(err);
            setPaymentStatus("failed");
        }
    };


    const handleEndexpiredAt = () => {
        alert("Mã QR đã hết hạn. Vui lòng tạo lại và thanh toán.");
        setPaymentStatus("idle")
        setQrCode("")
        setEpireQrCode("")
        setOrderCode("")
    }

    return (
        <div className="w-full  rounded-2xl border border-blue-700/60 bg-[#081d44] p-4 shadow-xl">
            {/* Chủ tài khoản */}
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                    <div className="flex flex-col justify-between">
                        <div className="rounded-xl border border-blue-700/50 bg-[#0b2452] p-3">
                            <p className="text-[11px] uppercase text-slate-400">
                                Chủ tài khoản
                            </p>

                            <div className="mt-1 flex items-center justify-between">
                                <span className="font-bold uppercase tracking-wide text-yellow-400">
                                    {accountName}
                                </span>
                            </div>
                        </div>

                        {/* Số tài khoản */}
                        <div className="mt-3 rounded-xl border border-blue-700/50 bg-[#0b2452] p-3">
                            <p className="text-[11px] uppercase text-slate-400">
                                Số tài khoản
                            </p>

                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-lg font-bold tracking-wider text-white">
                                    {accountNumber}
                                </span>
                            </div>
                        </div>

                        {/* Nội dung chuyển khoản */}
                        <div className="mt-3 rounded-xl border border-blue-700/50 bg-[#0b2452] p-3">
                            <p className="text-[11px] uppercase text-slate-400">
                                Nội dung chuyển khoản
                            </p>

                            <div className="mt-1 flex items-center justify-between">
                                <span className="font-bold uppercase tracking-wider text-yellow-400">
                                    {orderCode || "....."}
                                </span>

                            </div>
                        </div>


                    </div>

                    {/* QR */}
                    <div className="flex justify-center items-center flex-col">

                        { qrCode ? (
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="h-62.5 w-75 object-center"
                            />
                        ) : 
                            (
                                <div className="flex justify-between items-center flex-col">
                                    <div className="rounded-lg bg-white p-2 shadow-lg">
                                        <QrCode size={200} />
                                    </div>
                                    <div className="bg-yellow-500/10 text-yellow-400 mt-2">
                                        Mã QR code sẽ được tạo khi bạn bấm thanh toán
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            
                

                {/* Note */}
               

                {paymentStatus === "idle" && (
                    <button
                        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffc107] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#ffcf33] active:scale-[0.98] "

                        onClick={() => handleClickQRcode()}
                    >
                        <ShieldCheck size={20} />
                            Thanh toán ngay
                    </button>
                )}
            {/* LoadingOverlay */}

                {paymentStatus === "creating" && (
                    <div
                        className="relative mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffc107] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#ffcf33] active:scale-[0.98] "
                    >
                        <LoadingOverlay
                            show={paymentStatus === "creating" ? true : false}
                        />
                    </div>
                )}

                {paymentStatus === "pending" && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
                            </div>

                            <div>
                                <p className="font-semibold text-amber-900">
                                    Đang chờ xác nhận thanh toán
                                </p>

                                <p className="text-sm text-amber-700">
                                    Vui lòng hoàn tất chuyển khoản bằng mã QR và giữ nguyên trang này.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white px-4 py-2 text-center shadow">
                            <p className="text-xs text-gray-500">
                                QR hết hạn sau
                            </p>

                            <div className="text-xl font-bold text-red-600">
                                <Countdown expiredAt={expireQrCode} onExpired={handleEndexpiredAt}/>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* {paymentStatus === "success" && (
                    <SuccessPayment />
                )} */}

                {/* {paymentStatus === "failed" && (
                    <ErrorPayment />
                )} */}

                {/* {paymentStatus === "expired" && (
                    <ExpiredPayment />
                )} */}

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-yellow-500/10 p-2">
                    <AlertTriangle
                        size={18}
                        className="mt-0.5 shrink-0 text-yellow-400"
                    />

                    <p className="text-[12px] leading-5 text-yellow-300">
                        Vui lòng chuyển đúng nội dung để hệ thống tự động cộng ngọc.
                        <br />
                        Sai nội dung hoặc thiếu nội dung sẽ không được xử lý.
                    </p>
                </div>
        </div>
    );
}