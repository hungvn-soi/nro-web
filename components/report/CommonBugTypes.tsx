import { Bug } from "lucide-react";
import InfoCard from "./InfoCard";

export default function CommonBugTypes() {
    const bugs = [
        "Lỗi nhiệm vụ / Quest",
        "Lỗi vật phẩm / Item",
        "Lỗi kỹ năng / Skill",
        "Lỗi giao diện / Hiển thị",
        "Lỗi kết nối / Disconnect",
        "Lỗi khác",
    ];

    return (
        <InfoCard
            icon={Bug}
            title="LOẠI LỖI THƯỜNG GẶP"
            iconColor="text-violet-400"
        >
            <ul className="space-y-3 text-sm text-slate-300">
                {bugs.map((bug) => (
                    <li key={bug} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
                        <span>{bug}</span>
                    </li>
                ))}
            </ul>
        </InfoCard>
    );
}