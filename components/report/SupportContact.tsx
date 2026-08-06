import {
    Headphones,
    Phone,
    Mail,
} from "lucide-react";

import InfoCard from "./InfoCard";

export default function SupportContact() {
    return (
        <InfoCard
            icon={Headphones}
            title="LIÊN HỆ HỖ TRỢ"
            iconColor="text-sky-400"
        >
            <p className="mb-5 text-sm text-slate-300">
                Nếu cần hỗ trợ gấp, vui lòng liên hệ:
            </p>

            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="h-4 w-4 text-sky-400" />
                    <span>Zalo:</span>
                    <span>0123 456 789</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span>Email:</span>

                    <a
                        href="mailto:hotro@ngocrongnamec.vn"
                        className="text-sky-400 hover:underline"
                    >
                        hotro@ngocrongnamec.vn
                    </a>
                </div>
            </div>
        </InfoCard>
    );
}