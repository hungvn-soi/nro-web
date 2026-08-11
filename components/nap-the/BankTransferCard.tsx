"use client";

import { AlertTriangle, Loader2, QrCode, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import LoadingOverlay from "../LoadingOverlay";
import Countdown from "../Countdown";
import { useNotification } from "../notification";
import SuccessPayment from "./SuccessPayment";
import ErrorPayment from "./ErrorPayment";
import ExpiredPayment from "./ExpiredPayment";

interface Props {
    accountName: string;
    accountNumber: string;
    amount: number;
    onReloadHistory?: () => void;
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
    onReloadHistory,
}: Props) {
    const { user } = useAuth();
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
    const [qrCode, setQrCode] = useState("");
    const [expireQrCode, setEpireQrCode] = useState<string>("");
    const [orderCode, setOrderCode] = useState<string>("");
    const [paymentId, setPaymentId] = useState<number | null>(null);
    const notify = useNotification();

    const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const createAbortRef = useRef<AbortController | null>(null);

    // Poll payment status while there's an active paymentId
    useEffect(() => {
        if (!paymentId) return;

        const stopPolling = () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
            }
        };

        const checkPaymentStatus = async () => {
            try {
                const res = await fetch(`/api/payment/status?id=${paymentId}`, {
                    cache: "no-store",
                });

                const result = await res.json();

                if (!result.success) return;

                const status = result.data.status;

                if (status === "complete") {
                    setPaymentStatus("success");
                    setQrCode("");
                    stopPolling();
                }

                if (status === "expired") {
                    setPaymentStatus("expired");
                    setQrCode("");
                    stopPolling();
                }

                if (status === "error") {
                    setPaymentStatus("failed");
                    setQrCode("");
                    stopPolling();
                }
            } catch (error) {
                console.error(error);
                // Dừng poll ngay để tránh nhiều dialog xếp chồng nếu lỗi lặp lại
                stopPolling();
                notify.confirm({
                    title: "Lỗi",
                    message:
                        "Đã có lỗi xảy ra trong quá trình thanh toán, Vui Lòng liên hệ Box Chat or Admin",
                    onConfirm: () => {
                        handleResetThanhToan();
                    },
                });
            }
        };

        // kiểm tra ngay lần đầu
        checkPaymentStatus();

        // sau đó kiểm tra mỗi 3 giây
        pollIntervalRef.current = setInterval(checkPaymentStatus, 3000);

        return () => {
            stopPolling();
        };
    }, [paymentId]);

    useEffect(() => {
        if (paymentStatus === "pending") {
            onReloadHistory?.();
        }
    }, [paymentStatus]);

    // Hủy request tạo QR nếu component unmount giữa chừng
    useEffect(() => {
        return () => {
            createAbortRef.current?.abort();
        };
    }, []);

    const handleClickQRcode = async () => {
        if (!user) {
            notify.warning("Bạn vui lòng đăng nhập");
            return;
        }

        if (amount <= 0) {
            notify.warning("Vui lòng chọn gói nạp !!!");
            return;
        }

        const controller = new AbortController();
        createAbortRef.current = controller;
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        try {
            setPaymentStatus("creating");

            const res = await fetch("/api/payment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
                signal: controller.signal,
            });

            let result: any;

            try {
                result = await res.json();
            } catch {
                throw new Error("Máy chủ trả về dữ liệu không hợp lệ.");
            }

            if (!res.ok || !result.success) {
                throw new Error(result?.message || "Có lỗi xảy ra.");
            }

            setQrCode(result.data.qrUrl);
            setOrderCode(result.data.orderCode);
            setEpireQrCode(result.data.expiredAt);
            setPaymentId(result.data.paymentId);
            setPaymentStatus("pending");
        } catch (err) {
            console.error(err);
            setPaymentStatus("failed");

            const isAbort = err instanceof DOMException && err.name === "AbortError";

            notify.warning(
                isAbort
                    ? "Yêu cầu tạo mã QR quá thời gian chờ, vui lòng thử lại."
                    : err instanceof Error
                        ? err.message
                        : "Không thể tạo mã QR."
            );
        } finally {
            clearTimeout(timeoutId);
            createAbortRef.current = null;
        }
    };

    const handleResetThanhToan = () => {
        setPaymentStatus("idle");
        setQrCode("");
        setEpireQrCode("");
        setOrderCode("");
        setPaymentId(null);
    };

    return (
        <div className="w-full rounded-2xl border border-blue-700/60 bg-[#081d44] p-4 shadow-xl">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                {["idle", "pending", "creating"].includes(paymentStatus) && (
                    <div className="flex flex-col justify-between">
                        {/* Chủ tài khoản */}
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
                )}

                {/* QR */}
                {["idle", "pending", "creating"].includes(paymentStatus) && (
                    <div className="flex justify-center items-center flex-col">
                        {qrCode ? (
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="h-62.5 w-75 object-center"
                            />
                        ) : (
                            <div className="flex justify-between items-center flex-col">
                                <div className="rounded-lg bg-white p-2 shadow-lg">
                                    <QrCode size={200} />
                                </div>
                                <div className="bg-yellow-500/10 text-yellow-400 mt-2">
                                    Mã QR code sẽ được tạo khi bạn bấm thanh toán
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {paymentStatus === "idle" && (
                <button
                    className={`
                        mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffc107] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#ffcf33]
                        ${user ? "cursor-pointer active:scale-[0.98]" : "cursor-not-allowed"}
                        `}
                    disabled={!user}
                    onClick={handleClickQRcode}
                >
                    <ShieldCheck size={20} />
                    {user ? "Thanh toán ngay" : "Đăng nhập để thực hiện thanh toán"}
                </button>
            )}

            {paymentStatus === "creating" && (
                <div className="relative mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffc107] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#ffcf33] active:scale-[0.98]">
                    <LoadingOverlay show={paymentStatus === "creating"} />
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
                            <p className="text-xs text-gray-500">QR hết hạn sau</p>

                            <div className="text-xl font-bold text-red-600">
                                <Countdown
                                    expiredAt={expireQrCode}
                                    onExpired={() => setPaymentStatus("expired")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {paymentStatus === "success" && (
                <>
                    <SuccessPayment />
                    <button
                        className="cursor-pointer mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0e7fe9] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#0a67d1]"
                        onClick={handleResetThanhToan}
                    >
                        <ShieldCheck size={20} />
                        Tiếp tục thanh toán
                    </button>
                </>
            )}

            {paymentStatus === "failed" && (
                <>
                    <ErrorPayment />
                    <button
                        className="cursor-pointer mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0e7fe9] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#0a67d1]"
                        onClick={handleResetThanhToan}
                    >
                        <ShieldCheck size={20} />
                        Tiếp tục thanh toán
                    </button>
                </>
            )}

            {paymentStatus === "expired" && (
                <>
                    <ExpiredPayment />
                    <button
                        className="cursor-pointer mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0e7fe9] text-lg font-bold text-[#1a1a1a] transition hover:bg-[#0a67d1]"
                        onClick={handleResetThanhToan}
                    >
                        <ShieldCheck size={20} />
                        Làm mới thanh toán
                    </button>
                </>
            )}

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