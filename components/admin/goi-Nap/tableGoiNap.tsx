"use client"

import { IRechargePackage } from "@/types/rechargePackage";
import {
    Pencil,
    Trash2,
    Gem,
} from "lucide-react";
import DataTable, { IColumnTableAdmin } from "../DataTable";




interface ITableGoiNap {
    dataGoiNap: IRechargePackage[]
    actionTible: (type: "Edit" | "Delete", row: IRechargePackage) => void
}

const TableGoiNap = ({ dataGoiNap, actionTible }: ITableGoiNap) => {


    const columns: IColumnTableAdmin<IRechargePackage>[] = [
        {
            key: "id",
            title: "STT",
            className: "w-[60px]",
            render: (_, row) => (
                <span>
                    {String(row.id).padStart(2, "0")}
                </span>
            ),
        },

        {
            key: "price",
            title: "Giá nạp (VNĐ)",
            render: (value) => (
                <span>
                    {value.toLocaleString("vi-VN")} VNĐ
                </span>
            ),
        },

        {
            key: "gem",
            title: "Ngọc nhận được",
            render: (value) => (
                <div className="flex items-center gap-2 text-blue-600">
                    <Gem size={14} />
                    <span>{value.toLocaleString("vi-VN")} Ngọc</span>
                </div>
            ),
        },

        {
            key: "sortOrder",
            title: "Thứ tự hiển thị",
            className: "",
        },

        {
            key: "status",
            title: "Trạng thái",
            render: (value, row) => (
                <button
                    type="button"
                    onClick={() => {
                        console.log("Toggle:", row.id);
                    }}
                    className={`relative h-5 w-10 rounded-full transition ${value
                        ? "bg-emerald-500"
                        : "bg-gray-300"
                        }`}
                >
                    <span
                        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow transition ${value
                            ? "left-[22px]"
                            : "left-[2px]"
                            }`}
                    />
                </button>
            ),
        },

        {
            key: "actions",
            title: "Thao tác",
            render: (_, row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => actionTible("Edit", row)}
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        <Pencil size={15} />
                    </button>

                    <button
                        onClick={() => actionTible("Delete", row)}
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ];

    return(
        <div>
            <DataTable
                columns={columns}
                data={dataGoiNap}
            />
        </div>
    )
}   

export default TableGoiNap