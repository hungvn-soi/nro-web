"use client"
interface IPops {
    action: () => void
}
const RegisterBTN = ({ action }: IPops) => {
    return(
        <button
            className="
                cursor-pointer
                h-10 rounded-xl bg-linear-to-b
                from-yellow-300 to-yellow-500 px-5
                text-sm font-bold text-[#462300]
                shadow-lg transition hover:scale-105
            "
            onClick={action}
        >
            Đăng ký
        </button>
    )
}
export default RegisterBTN