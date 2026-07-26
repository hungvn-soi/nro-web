interface SectionTitleProps {
    title: string;
    onViewAll?: () => void;
}
const SectionTitle2 = ({
    title,
    onViewAll,
}: SectionTitleProps) => {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white">
                    {title}
                </h2>

                <div className="mt-1 h-[3px] w-20 rounded-full bg-yellow-300" />
            </div>

            <button
                onClick={onViewAll}
                className="text-sm font-semibold text-white/80 transition hover:text-white"
            >
                Xem tất cả
            </button>
        </div>
    );
}

export default SectionTitle2