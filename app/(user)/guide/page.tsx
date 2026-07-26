import { Construction } from "lucide-react"

const HuongDan = () => {
    return (
        <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-blue-900/50 bg-[#0b1324]/80 p-10 text-center">
            <Construction className="mb-4 h-14 w-14 text-yellow-400" />

            <h1 className="text-3xl font-bold text-white">
                Hướng dẫn tân thủ
            </h1>

            <p className="mt-3 max-w-md text-gray-300">
                Trang này đang được phát triển.
                <br />
                Vui lòng quay lại sau để trải nghiệm những tính năng mới.
            </p>

            <div className="mt-6 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-sm font-medium text-yellow-300">
                🚧 Coming Soon
            </div>
        </div>
    )
}

export default HuongDan