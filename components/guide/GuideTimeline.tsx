interface TimelineItem {
    title: string;
    description: string;
}

interface Props {
    items: TimelineItem[];
}

export default function GuideTimeline({ items }: Props) {
    return (
        <div className="relative ml-3 border-l border-yellow-500/30">

            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative mb-8 pl-8"
                >
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-yellow-400" />

                    <h3 className="font-bold text-white">
                        {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-zinc-400">
                        {item.description}
                    </p>
                </div>
            ))}

        </div>
    );
}