interface DownloadButtonProps {
    className?: string;
    title: string
}

const TitlePageDowload = ({
    className = "",
    title
}: DownloadButtonProps) => {
    return (
        <div
            className={`
                relative
                h-14
                w-[320px]
                ${className}
            `}
        >
            {/* Border */}
            <div
                className="absolute inset-0 bg-[#1f73d4]"
                style={{
                    clipPath:
                        "polygon(18px 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 18px 100%, 0% 50%)",
                }}
            />

            {/* Background */}
            <div
                className="absolute inset-[2px] bg-gradient-to-b from-[#0b4f96] via-[#073b75] to-[#062d58]"
                style={{
                    clipPath:
                        "polygon(18px 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 18px 100%, 0% 50%)",
                }}
            />

            {/* Highlight */}
            <div
                className="absolute left-[2px] right-[2px] top-[2px] h-1/2 rounded-t-lg bg-gradient-to-b from-white/20 to-transparent"
                style={{
                    clipPath:
                        "polygon(18px 0%, calc(100% - 18px) 0%, calc(100% - 8px) 100%, 8px 100%)",
                }}
            />

            {/* Text */}
            <span
                className="
                    relative
                    z-10
                    flex
                    h-full
                    text-2xl
                    items-center
                    justify-center
                    font-extrabold
                    bg-linear-to-b
                    from-yellow-200
                    via-yellow-400
                    to-orange-500
                    bg-clip-text
                    text-transparent
                "
            >
                {title}
            </span>
        </div>
    );
}

export default TitlePageDowload