interface SectionTitleProps {
    title: string;
    subtitle?: string;
}

const SectionTitle = ({
    title,
    subtitle,
}: SectionTitleProps) => {
    return (
        <div className="flex flex-col items-center text-center">
            {/* Title */}
            <div className="flex items-center gap-5">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-400" />

                <h2
                    className="
                        text-3xl
                        font-extrabold
                        uppercase
                        tracking-wide
                        text-white
                        drop-shadow-[0_0_10px_rgba(255,255,255,.3)]
                    "
                >
                    {title}
                </h2>

                <div className="h-[2px] w-16 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-400" />
            </div>

            {subtitle && (
                <p className="mt-3 max-w-2xl text-sm text-slate-300">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default SectionTitle