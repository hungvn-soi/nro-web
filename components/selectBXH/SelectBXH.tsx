"use client"
import SectionTitle2 from "../SectionTitle2"
import TabsForm from "../TabForm"
import TopPower from "./TopPower";
import { useRouter } from "next/navigation";


const SelectBXH = () => {
    const router = useRouter();

    const handleViewAll = () => {
        router.push("ranking");
    }

    const tabs = [
        { id: "luchien", label: "Lực chiến", content: <TopPower /> },
        { id: "capdo", label: "Cấp độ", content: <p className="text-white">⭐ Đang phát triển.</p> },
        { id: "nap", label: "Nạp", content: <p className="text-white">⭐ Đang phát triển.</p> },
    ];

    return (
        <>
            <SectionTitle2
                title="Bảng xếp hạng"
                onViewAll={handleViewAll}
            />

            <TabsForm
                data={tabs}
                className="mt-6"
            />

        </>
    )
}

export default  SelectBXH