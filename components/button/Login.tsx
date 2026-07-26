"use client"

interface Ipop{
    action: () => void
}


const LoginBTN = ({ action } : Ipop) => {
    
    
    return (
        <button
            className="
                cursor-pointer
                h-10 rounded-xl border border-yellow-500/40
                bg-[#0d1b2d] px-5 text-sm font-semibold
                text-white transition hover:bg-[#13243c]
            "
            onClick={action}
        >
            Đăng nhập
        </button>
    )
}

export default LoginBTN