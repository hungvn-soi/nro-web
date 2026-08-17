"use client"

import LoadingOverlay from "@/components/LoadingOverlay";
import { useNotification } from "@/components/notification";
import { useState } from "react";

const PanelGameClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const notify =useNotification()

    const handleResetBoss = async () => {
        notify.confirm({
            title: "Xác nhận",
            message: "Bạn có chắc chắn reset lại BOSS không !!!!",
            onConfirm() {
                handleApiResetBoss()
            },
        })
    };

    const handleApiResetBoss = async () => {
        try {
            setIsLoading(true);

            const res = await fetch("/api/admin/panel-game/reset-boss", {
                method: "POST",
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                notify.error(data.message || "Reset boss thất bại");
                return;
            }

            notify.success(data.message || "Reset boss thành công");

        } catch (error) {
            console.error("Reset boss error:", error);
            notify.error("Không thể kết nối đến server");
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <div>
            <LoadingOverlay
                show={isLoading}
            />
            <button
                className="px-5 py-2 h-[52px] bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer"
                onClick={() => handleResetBoss()}
            >
                RESET BOS GAME
            </button>

        </div>
    )
}
export default PanelGameClient