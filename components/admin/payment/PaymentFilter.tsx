"use client";

import { useState } from "react";
import {
    Search,
    ChevronDown,
    CalendarDays,
    Check,
    Clock3,
    Hourglass,
    CircleX,
} from "lucide-react";

interface PaymentFilterProps {
    onSearch?: (params: {
        keyword: string;
        status: string;
        method: string;
        fromDate: string;
        toDate: string;
        tab: string;
    }) => void;

    counts?: {
        all: number;
        success: number;
        pending: number;
        expired: number;
        error: number;
    };
}

const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "complete", label: "Thành công" },
    { value: "pending", label: "Đang chờ" },
    { value: "expired", label: "Hết hạn" },
    { value: "error", label: "Lỗi" },
];

const methodOptions = [
    { value: "all", label: "Tất cả" },
    { value: "bank", label: "Ngân hàng" },
    { value: "card", label: "Thẻ" },
];

export default function PaymentFilter({
    onSearch,
    counts = {
        all: 342,
        success: 328,
        pending: 8,
        expired: 4,
        error: 2,
    },
}: PaymentFilterProps) {
    const [keyword, setKeyword] = useState("");

    const [status, setStatus] = useState("all");
    const [method, setMethod] = useState("all");

    const [fromDate, setFromDate] = useState("2026-08-01");
    const [toDate, setToDate] = useState("2026-08-12");

    const [activeTab, setActiveTab] = useState("all");

    const handleSearch = () => {
        onSearch?.({
            keyword,
            status,
            method,
            fromDate,
            toDate,
            tab: activeTab,
        });
    };
    return (
        <div className="w-full rounded-xl border border-slate-100 bg-white shadow-sm">
            {/* ================= FILTER ================= */}
            <div className="p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr_1fr_1.5fr_auto]">
                    {/* Search */}
                    <div>
                        <label className="mb-2 block text-[16px] font-medium text-slate-700">
                            Tìm kiếm
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Nhập order code, username hoặc transaction ID..."
                                className="
                                    h-9 w-full rounded-md border border-slate-200
                                    bg-white pl-3 pr-9 text-[16px] text-slate-700
                                    outline-none transition
                                    placeholder:text-slate-400
                                    hover:border-slate-300
                                    focus:border-indigo-400
                                    focus:ring-2 focus:ring-indigo-100
                                    "
                            />

                            <Search
                                className="
                                pointer-events-none absolute right-3 top-1/2
                                h-3.5 w-3.5 -translate-y-1/2 text-slate-400
                                "
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <SelectBox
                        label="Trạng thái"
                        value={status}
                        options={statusOptions}
                        onChange={setStatus}
                    />

                    {/* Method */}
                    <SelectBox
                        label="Phương thức"
                        value={method}
                        options={methodOptions}
                        onChange={setMethod}
                    />

                    {/* Date range */}
                    <div>
                        <label className="mb-2 block text-[16px] font-medium text-slate-700">
                            Khoảng thời gian
                        </label>

                        <div className="flex h-9 items-center rounded-md border border-slate-200 bg-white px-2">
                            <CalendarDays className="mr-2 h-3.5 w-3.5 shrink-0 text-slate-400" />

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="
                                    min-w-0 flex-1 bg-transparent
                                    text-[18px] text-black
                                    outline-none
                                "
                            />

                            <span className="mx-1 text-[10px] text-slate-300">
                                -
                            </span>

                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="
                                min-w-0 flex-1 bg-transparent
                                text-[18px] text-black
                                outline-none
                                "
                            />
                        </div>
                    </div>

                    {/* Search button */}
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="
                                h-9 w-full rounded-md
                                bg-indigo-600 px-5
                                text-[16px] font-medium text-white
                                shadow-sm
                                transition
                                hover:bg-indigo-700
                                active:scale-[0.98]
                                lg:w-auto
                            "
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= TABS ================= */}
        </div>
    );
}

/* =========================================================
   SELECT COMPONENT
========================================================= */

interface SelectBoxProps {
    label: string;
    value: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange: (value: string) => void;
}

function SelectBox({
    label,
    value,
    options,
    onChange,
}: SelectBoxProps) {
    return (
        <div>
            <label className="mb-2 block text-[16px] font-medium text-slate-700">
                {label}
            </label>

            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="
                        h-9 w-full appearance-none
                        rounded-md border border-slate-200
                        bg-white px-3 pr-8
                        text-[16px] text-slate-600
                        outline-none transition
                        hover:border-slate-300
                        focus:border-indigo-400
                        focus:ring-2 focus:ring-indigo-100
                    "
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    className="
                    pointer-events-none
                    absolute right-2.5 top-1/2
                    h-3.5 w-3.5
                    -translate-y-1/2
                    text-slate-400
                "
                />
            </div>
        </div>
    );
}