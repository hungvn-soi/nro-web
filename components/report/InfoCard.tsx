import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
    icon: LucideIcon;
    title: string;
    iconColor: string;
    children: ReactNode;
}

export default function InfoCard({
    icon: Icon,
    title,
    iconColor,
    children,
}: Props) {
    return (
        <div className="rounded-xl border border-slate-700 bg-[#0f172a]/80 p-5 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
                <Icon className={`h-6 w-6 ${iconColor}`} />
                <h3 className={`text-lg font-bold ${iconColor}`}>
                    {title}
                </h3>
            </div>

            {children}
        </div>
    );
}   