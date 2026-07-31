interface Props {
    number: string;
    title: string;
    desc: string;
}

export default function GuideCard({
    number,
    title,
    desc,
}: Props) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-[#9a9fa54a] p-6 transition hover:border-yellow-500">

            <div className="mb-4 text-5xl">

                {number}

            </div>

            <h3 className="mb-3 text-xl font-bold text-white">

                {title}

            </h3>

            <p className="leading-7 text-zinc-400">

                {desc}

            </p>

        </div>
    );
}