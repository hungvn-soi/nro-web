interface Props {
    title: string;
    value: string;
}

export default function GuideBossDrop({
    title,
    value,
}: Props) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-[#9a9fa54a] p-5">

            <p className="text-sm text-zinc-400">
                {title}
            </p>

            <h3 className="mt-2 text-xl font-bold text-yellow-400">
                {value}
            </h3>

        </div>
    );
}