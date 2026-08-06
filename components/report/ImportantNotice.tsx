import { TriangleAlert } from "lucide-react";
import InfoCard from "./InfoCard";

export default function ImportantNotice() {
    const items = [
        "Vui lòng kiểm tra kỹ trước khi gửi báo lỗi.",
        "Mô tả chi tiết giúp chúng tôi xử lý nhanh hơn.",
        "Không gửi báo lỗi nhiều lần về cùng một vấn đề.",
        "Báo lỗi đúng mục đích, không spam hoặc troll.",
        "Các báo lỗi hợp lệ sẽ được hỗ trợ sớm nhất.",
    ];

    return (
        <InfoCard
            icon={TriangleAlert}
            title="LƯU Ý QUAN TRỌNG"
            iconColor="text-yellow-400"
        >
            <ul className="space-y-3 text-sm text-slate-300">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </InfoCard>
    );
}