"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function PromotionPopup() {
    const [open, setOpen] = useState<boolean>(true)
    const handleClose =() => {
        setOpen(false)
    }

    if(!open) {
        return null
    }
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Close */}
                <button
                    onClick={() => handleClose()}
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                    aria-label="Đóng"
                >
                    <X size={20} />
                </button>

                {/* Nội dung */}
                <div className="p-8 text-center">
                    <div className="mb-4 text-5xl">
                        🎉
                    </div>

                    <h2 className="text-2xl font-bold">
                        Đây là 1 trang web chỉ mang tính chất học hỏi 
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Không nhằm mục đích kinh doanh hay nhằm mục đích phá hoại hay động chạm đến ai cả
                    </p>

                    <button 
                        onClick={() => handleClose()}
                        className="mt-6 rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
                        Thoát để tiếp tục trải nghiệm
                    </button>
                </div>
            </div>
        </div>
    );
}