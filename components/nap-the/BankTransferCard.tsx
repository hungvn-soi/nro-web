"use client";

import { Copy, AlertTriangle } from "lucide-react";

interface Props {
    accountName: string;
    accountNumber: string;
    transferContent: string;
    qrCode: string;
}

export default function BankTransferCard({
    accountName,
    accountNumber,
    transferContent,
    qrCode,
}: Props) {
    const copy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        // Có thể thay bằng toast
        alert("Đã sao chép!");
    };

    return (
        <div className="w-full  rounded-2xl border border-blue-700/60 bg-[#081d44] p-4 shadow-xl">
            {/* Chủ tài khoản */}

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                    <div>
                        <div className="rounded-xl border border-blue-700/50 bg-[#0b2452] p-3">
                            <p className="text-[11px] uppercase text-slate-400">
                                Chủ tài khoản
                            </p>

                            <div className="mt-1 flex items-center justify-between">
                                <span className="font-bold uppercase tracking-wide text-yellow-400">
                                    {accountName}
                                </span>

                                <button
                                    onClick={() => copy(accountName)}
                                    className="flex items-center gap-2 rounded-lg border border-blue-500/50 bg-[#14356d] px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
                                >
                                    <Copy size={15} />
                                    COPY
                                </button>
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

                                <button
                                    onClick={() => copy(accountNumber)}
                                    className="flex items-center gap-2 rounded-lg border border-blue-500/50 bg-[#14356d] px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
                                >
                                    <Copy size={15} />
                                    COPY
                                </button>
                            </div>
                        </div>

                        {/* Nội dung chuyển khoản */}
                        <div className="mt-3 rounded-xl border border-blue-700/50 bg-[#0b2452] p-3">
                            <p className="text-[11px] uppercase text-slate-400">
                                Nội dung chuyển khoản
                            </p>

                            <div className="mt-1 flex items-center justify-between">
                                <span className="font-bold uppercase tracking-wider text-yellow-400">
                                    {transferContent}
                                </span>

                                <button
                                    onClick={() => copy(transferContent)}
                                    className="flex items-center gap-2 rounded-lg border border-blue-500/50 bg-[#14356d] px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
                                >
                                    <Copy size={15} />
                                    COPY
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* QR */}
                    <div className="flex justify-center items-center">
                        <div className="rounded-lg bg-white p-2 shadow-lg">
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="h-[250px] w-[300px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            
                

                {/* Note */}
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