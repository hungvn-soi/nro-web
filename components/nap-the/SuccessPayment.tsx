const SuccessPayment = () => {
    return(
        <>
            {/* Thanh toán thành công */}
            <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    {/* Success icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <svg
                            className="h-6 w-6 text-emerald-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <div>
                        <div className="text-base font-bold text-emerald-700">
                            Thanh toán thành công
                        </div>

                        <div className="mt-1 text-sm text-emerald-600">
                            Cảm ơn bạn! Giao dịch đã được xác nhận thành công.
                        </div>
                    </div>
                </div>

                {/* Trạng thái */}
                <div className="shrink-0 rounded-lg border border-emerald-200 bg-white px-4 py-2 text-center shadow-sm">
                    <div className="text-xs text-gray-500">
                        Trạng thái
                    </div>

                    <div className="mt-0.5 text-sm font-bold text-emerald-600">
                        Thành công
                    </div>
                </div>
            </div>
        </>
    )
}
export default SuccessPayment