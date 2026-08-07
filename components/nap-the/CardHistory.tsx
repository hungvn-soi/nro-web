"use client"

import { IPayment, IPaymentHistory } from "@/types/payment";

export interface RechargeHistory {
    id: number;
    amount: string;
    gem: string;
    method: string;
    time: string;
    status: "success" | "failed" | "pending";
}

interface Props {
    data: IPaymentHistory[] | null;
}

const statusMap = {
    success: {
        label: "Thành công",
        className: "text-green-400",
    },
    failed: {
        label: "Thất bại",
        className: "text-red-500",
    },
    pending: {
        label: "Đang xử lý",
        className: "text-yellow-400",
    },
};

export default function CardHistory({ data }: Props) {
    return (
        <>
            <div className="border-2 border-amber-400 rounded-2xl pt-5 px-5  w-full mt-5">
                <h1 className="font-bold text-amber-400 uppercase   ">3. Lịch sử thanh toán</h1>

                <div className="py-5">
                    {/* ================= Desktop ================= */}
                    <div className="hidden overflow-hidden rounded-2xl border border-[#28415f] bg-[#071a33] md:block">

                        {
                            data?.length  === 0 && (
                                <div className="rounded-xl border border-[#28415f] bg-[#071a33] py-10 text-center text-gray-400">
                                    Chưa có lịch sử nạp.
                                </div>
                            )
                        }

                        {
                            data && data.length > 0 && (
                                <table className="w-full">
                                    <thead className="bg-[#0b2748]">
                                        <tr className="text-sm text-gray-300">
                                            <th className="px-4 py-3 text-left w-14">#</th>
                                            <th className="px-4 py-3 text-left">Mệnh giá</th>
                                            <th className="px-4 py-3 text-left">Order Code</th>
                                            <th className="px-4 py-3 text-left">Phương thức</th>
                                            <th className="px-4 py-3 text-left">Thời gian</th>
                                            <th className="px-4 py-3 text-left">Trạng thái</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            data && data.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-t border-[#183555] text-sm text-white hover:bg-[#0d2645]"
                                                >
                                                    <td className="px-4 py-3">{item.id}</td>
                                                    <td className="px-4 py-3">{item.amount}</td>
                                                    <td className="px-4 py-3">{item.orderCode}</td>
                                                    <td className="px-4 py-3">{item.paymentMethod}</td>
                                                    <td className="px-4 py-3">{item.createdAt
                                                        ? new Date(item.createdAt).toLocaleString("vi-VN")
                                                        : "-"}</td>
                                                    <td
                                                        className={`px-4 py-3 font-semibold`}
                                                    >
                                                        {item.status}
                                                    </td>
                                                </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        }
                        
                    </div>

                    {/* ================= Mobile ================= */}
                    <div className="space-y-3 md:hidden">
                        {
                            data && data.length > 0 && data.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-[#28415f] bg-[#071a33] p-4 text-sm text-white"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="font-bold text-yellow-400">
                                            #{index + 1}
                                        </span>

                                        <span
                                            className={`font-semibold`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-2">
                                        <span className="text-gray-400">Mệnh giá</span>
                                        <span>{item.amount}</span>

                                        <span className="text-gray-400">Order Code</span>
                                        <span>{item.orderCode}</span>

                                        <span className="text-gray-400">Phương thức</span>
                                        <span>{item.paymentMethod}</span>

                                        <span className="text-gray-400">Thời gian</span>
                                        <span>{item.createdAt
                                            ? new Date(item.createdAt).toLocaleString("vi-VN")
                                            : "-"}</span>
                                    </div>
                                </div>
                            ))
                        }

                        {
                            data?.length === 0 && (
                                <div className="rounded-xl border border-[#28415f] bg-[#071a33] py-10 text-center text-gray-400">
                                    Chưa có lịch sử nạp.
                                </div>
                            )
                        }
                    </div>  

                </div>

            </div>
        </>
    );
}