"use client"
import { IPaymentTableALL } from "@/types/payment";
import DataTable, { IColumnTableAdmin } from "../DataTable"
import { formatNumber } from "@/utils/format";



interface IPropTablepayment {
    dataTable: IPaymentTableALL[]
    actionInfo: (row: IPaymentTableALL) => void
}
type status = "pending" | "complete" | "expired" | "error"
const PaymentTable = ({ dataTable, actionInfo }: IPropTablepayment) => {
    
    
    const columns: IColumnTableAdmin<IPaymentTableALL>[] = [
        {
            key: "id",
            title: "ID",
            className: "w-[60px]",
            render: (_, row) => (
                <span>
                    {String(row.id).padStart(2, "0")}
                </span>
            ),
        },

        {
            key: "userId",
            title: "Tài khoản",
        },

        {
            key: "orderCode",
            title: "Oder Code",
        },

        {
            key: "paymentMethod",
            title: "Phương thức",
            className: "",
        },
        {
            key: "amount",
            title: "Số tiền",
            render: (value) => {
                return formatNumber(value);
            },
        },
        {
            key: "createdAt",
            title: "Ngày tạo",
            render: (value) => {
                return new Date(value).toLocaleString("vi-VN");
            },
        },
        {
            key: "expiredAt",
            title: "Ngày hết hạn",
            render: (value) => {
                return new Date(value).toLocaleString("vi-VN");
            },
        },

        {
            key: "status",
            title: "Trạng thái",
            render: (value: status) => {
                switch (value) {
                    case "pending":
                        return (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                                ⏳ Đang chờ
                            </span>
                        );

                    case "expired":
                        return (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                                ⌛ Hết hạn
                            </span>
                        );

                    case "complete":
                        return (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                ✓ Thành công
                            </span>
                        );

                    case "error":
                        return (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                                ✕ Lỗi
                            </span>
                        );

                    default:
                        return null;
                }
            },
        },

        {
            key: "actions",
            title: "Thao tác",
            render: (_, row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => actionTible(row)}
                        className="flex h-8 w-full items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Chi tiết
                    </button>

                </div>
            ),
        },
    ];
    

    const actionTible =(row: IPaymentTableALL) => {
        actionInfo(row)
    }


    return(
        <DataTable
            columns={columns}
            data={dataTable}
        />
    )
}

export default PaymentTable