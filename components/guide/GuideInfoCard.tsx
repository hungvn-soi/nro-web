import { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}

export default function GuideInfoCard({
    icon,
    title,
    children,
}: Props) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-[#9a9fa54a] p-6 transition hover:border-yellow-500">

            <div className="mb-5 flex items-center gap-4">

                <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-white">
                    {title}
                </h3>

            </div>

            <div className="leading-7 text-zinc-400">
                {children}
            </div>

        </div>
    );
}