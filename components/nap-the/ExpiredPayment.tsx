const ExpiredPayment = () => {
    return (
        <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <div className="flex items-center gap-4">
                {/* Expired icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-amber-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path
                            strokeLinecap="round"
                            d="M12 7v5l3 2"
                        />
                    </svg>
                </div>

                {/* Nội dung */}
                <div>
                    <h3 className="font-bold text-amber-700">
                        QR thanh toán đã hết hạn
                    </h3>

                    <p className="mt-1 text-sm text-amber-600">
                        Thời gian thanh toán đã kết thúc. Vui lòng tạo giao dịch mới.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ExpiredPayment