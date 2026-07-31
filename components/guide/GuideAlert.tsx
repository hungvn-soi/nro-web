import { TriangleAlert } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

export default function GuideAlert({
    children,
}: Props) {
    return (
        <div className="mt-8 flex gap-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5">

            <TriangleAlert className="mt-1 text-yellow-400" />

            <div className="leading-7 text-yellow-100">

                {children}

            </div>

        </div>
    );
}