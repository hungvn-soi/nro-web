"use Client"

import { IPaymentTableALL } from "@/types/payment"


type status = "pending" | "complete" | "expired" | "error"

interface IPlaymentInfo {
    payemt: IPaymentTableALL | null
}

const PaymentInfo = ({ payemt }: IPlaymentInfo) => {
    return(
        <div>
            <div className=" flex justify-between items-center text-black pb-3 border-b-2 border-b-gray-100">
                <h1 className=" text-[20px] font-bold">Chi tiết giao dịch</h1>
                <div className="">x</div>
            </div>

            <div>
                {payemt && (
                    <>
                        {StatusInfo(payemt?.status)}
                        <div className="grid grid-cols-2 mt-3">
                            <div>Order Code</div>
                            <span className="font-bold text-black">{payemt.orderCode}</span>
                        </div>

                        <h1 className=" text-[18px] font-bold mt-3">Thông tin giao dịch</h1>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Account</div>
                            <span className="font-bold text-black">{payemt.userId}</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Số tiền</div>
                            <span className="font-bold text-black">{payemt.amount}</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Phương thức</div>
                            <span className="font-bold text-black">{payemt.paymentMethod}</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Transaction ID</div>
                            <span className="font-bold text-black">{payemt.sepayTransactionId || "null"}</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Ngày tạo</div>
                            <span className="font-bold text-black">{payemt.createdAt.toDateString()}</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Ngày hết hạn</div>
                            <span className="font-bold text-black">{payemt.expiredAt.toDateString()}</span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div>Trạng thái</div>
                            <span className="font-bold text-black">{payemt.status}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentInfo


const StatusInfo = (value: status) => {
    switch (value) {
        case "pending":
            return (
                <span className="mt-3 inline-flex w-full h-12.5 text-[24px] items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                    ⏳ Đang chờ
                </span>
            );

        case "expired":
            return (
                <span className="mt-3 inline-flex w-full h-12.5 text-[24px] items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                    ⌛ Hết hạn
                </span>
            );

        case "complete":
            return (
                <span className="mt-3 inline-flex w-full h-12.5 text-[24px] items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    ✓ Thành công
                </span>
            );

        case "error":
            return (
                <span className="mt-3 inline-flex w-full h-12.5 text-[24px] items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                    ✕ Lỗi
                </span>
            );

        default:
            return null;
    }
}