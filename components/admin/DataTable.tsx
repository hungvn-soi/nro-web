"use client";

import React from "react";

export interface IColumnTableAdmin<T> {
    key: string;
    title: string;
    className?: string;
    render?: (value: any, row: T, index: number) => React.ReactNode;
}

interface DataTableAdminProps<T> {
    columns: IColumnTableAdmin<T>[];
    data: T[];
    loading?: boolean;
    emptyText?: string;
}

export default function DataTable<T>({
    columns,
    data,
    loading = false,
    emptyText = "Không có dữ liệu",
}: DataTableAdminProps<T>) {
    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full min-w-[800px] border-collapse">
                <thead>
                    <tr className="bg-gray-50">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${column.className ?? ""}`}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-10 text-center text-gray-500"
                            >
                                Đang tải dữ liệu...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-10 text-center text-gray-500"
                            >
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-100 hover:bg-gray-50"
                            >
                                {columns.map((column) => {
                                    const value = (row as any)[column.key];

                                    return (
                                        <td
                                            key={column.key}
                                            className={`px-4 py-3 text-sm text-gray-700 ${column.className ?? ""}`}
                                        >
                                            {column.render
                                                ? column.render(value, row, index)
                                                : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}