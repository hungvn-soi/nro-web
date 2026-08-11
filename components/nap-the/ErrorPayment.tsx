const ErrorPayment = () => {
    return(
        <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
            <div className="flex items-center gap-4">
                {/* Error icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>

                {/* Nội dung */}
                <div>
                    <h3 className="font-bold text-red-700">
                        Thanh toán thất bại
                    </h3>

                    <p className="mt-1 text-sm text-red-600">
                        Giao dịch không thành công. Vui lòng thử lại.
                    </p>
                </div>
            </div>

            {/* Trạng thái */}
            <div className="shrink-0 rounded-lg border border-red-200 bg-white px-4 py-2 text-center shadow-sm">
                <div className="text-xs text-gray-500">
                    Trạng thái
                </div>

                <div className="font-bold text-red-600">
                    Thất bại
                </div>
            </div>
        </div>
    )
}

export default ErrorPayment