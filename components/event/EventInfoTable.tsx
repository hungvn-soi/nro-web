type Row = {
    label: string;
    value: React.ReactNode;
};

interface IEventInfoTable {
    data: Row[] | null;
}

export default function EventInfoTable({ data }: IEventInfoTable) {



    return (
        <div className="overflow-hidden rounded-lg border border-white/10 ">
            {data && data.map((row, index) => (
                <div
                    key={row.label}
                    className={`grid grid-cols-[280px_1fr] ${index !== data.length - 1 ? "border-b border-white/10" : ""
                        }`}
                >
                    <div className="flex items-center gap-2 border-r border-white/10 px-5 py-4 text-gray-400">
                        📅
                        <span>{row.label}</span>
                    </div>

                    <div className="flex items-center px-5 py-4 font-semibold text-white">
                        {row.value}
                    </div>
                </div>
            ))}
        </div>
    );
}