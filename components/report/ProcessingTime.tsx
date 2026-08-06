import { Clock3 } from "lucide-react";
import InfoCard from "./InfoCard";

export default function ProcessingTime() {
    return (
        <InfoCard
            icon={Clock3}
            title="THỜI GIAN XỬ LÝ"
            iconColor="text-green-400"
        >
            <p className="text-sm leading-7 text-slate-300">
                Chúng tôi sẽ tiếp nhận và phản hồi các báo lỗi hợp lệ trong thời gian
                sớm nhất.
            </p>

            <p className="mt-4 text-sm font-semibold text-green-400">
                Thời gian xử lý dự kiến: 24 - 48 giờ
            </p>
        </InfoCard>
    );
}