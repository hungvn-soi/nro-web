"use client";

import {
    AlertTriangle,
    CheckCircle2,
    HelpCircle,
    X,
    XCircle,
} from "lucide-react";

import { NotificationItem } from "./notification.types";

interface Props {
    notification: NotificationItem;
    onClose: (id: string) => void;
}

export default function NotificationItemComponent({
    notification,
    onClose,
}: Props) {
    const {
        id,
        type = "success",
        title,
        message,
        onConfirm,
        onCancel,
    } = notification;

    /**
     * Config UI
     */
    const config = {
        success: {
            icon: CheckCircle2,

            iconClass: "text-emerald-500",

            borderClass: "border-emerald-400",

            iconBgClass: "bg-emerald-50",
        },

        error: {
            icon: XCircle,

            iconClass: "text-red-500",

            borderClass: "border-red-400",

            iconBgClass: "bg-red-50",
        },

        warning: {
            icon: AlertTriangle,

            iconClass: "text-amber-500",

            borderClass: "border-amber-400",

            iconBgClass: "bg-amber-50",
        },

        confirm: {
            icon: HelpCircle,

            iconClass: "text-blue-600",

            borderClass: "border-blue-500",

            iconBgClass: "bg-blue-50",
        },
    };

    const current = config[type];

    const Icon = current.icon;

    /**
     * YES
     */
    const handleConfirm = () => {
        onConfirm?.();

        onClose(id);
    };

    /**
     * NO
     */
    const handleCancel = () => {
        onCancel?.();

        onClose(id);
    };

    /* =========================================================
       CONFIRM MODAL
    ========================================================= */

    if (type === "confirm") {
        return (
            <div
                className="
                    fixed
                    inset-0
                    z-[10000]

                    flex
                    items-center
                    justify-center

                    p-4

                    pointer-events-auto
                "
            >
                {/* =================================================
                    OVERLAY

                    Khóa toàn bộ UI bên dưới
                ================================================= */}

                <div
                    className="
                        absolute
                        inset-0

                        bg-black/55

                        backdrop-blur-[2px]

                        pointer-events-auto
                    "
                />

                {/* =================================================
                    MODAL
                ================================================= */}

                <div
                    className="
                        relative
                        z-10

                        w-[420px]
                        max-w-full

                        overflow-hidden

                        rounded-xl

                        border
                        border-blue-200

                        bg-white

                        shadow-[0_25px_80px_rgba(0,0,0,0.35)]

                        pointer-events-auto

                        animate-in
                        fade-in
                        zoom-in-95
                        duration-200
                    "
                >
                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="flex items-start gap-4 p-5">
                        {/* ICON */}

                        <div
                            className={`
                                flex
                                h-11
                                w-11
                                shrink-0

                                items-center
                                justify-center

                                rounded-full

                                ${current.iconBgClass}
                            `}
                        >
                            <Icon
                                size={24}
                                strokeWidth={2.5}
                                className={
                                    current.iconClass
                                }
                            />
                        </div>

                        {/* TEXT */}

                        <div className="min-w-0 flex-1">
                            {title && (
                                <h3
                                    className="
                                        text-[16px]
                                        font-bold
                                        leading-6
                                        text-gray-900
                                    "
                                >
                                    {title}
                                </h3>
                            )}

                            <p
                                className={`
                                    text-[14px]
                                    leading-6
                                    text-gray-500

                                    ${title
                                        ? "mt-1"
                                        : ""
                                    }
                                `}
                            >
                                {message}
                            </p>
                        </div>

                        {/* X */}

                        <button
                            type="button"
                            onClick={() =>
                                onClose(id)
                            }
                            className="
                                flex
                                h-7
                                w-7
                                shrink-0

                                items-center
                                justify-center

                                rounded-md

                                text-gray-400

                                transition-all

                                hover:bg-gray-100
                                hover:text-gray-700

                                active:scale-95
                                cursor-pointer
                                pointer-events-auto
                            "
                            aria-label="Đóng"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-2

                            border-t
                            border-gray-100

                            bg-gray-50

                            px-5
                            py-4
                        "
                    >
                        {/* NO */}

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="
                                rounded-lg

                                border
                                border-gray-300

                                bg-white

                                px-5
                                py-2

                                text-sm
                                font-medium
                                text-gray-700

                                shadow-sm

                                transition-all

                                hover:bg-gray-100
                                hover:border-gray-400

                                active:scale-95
                                cursor-pointer
                                pointer-events-auto
                            "
                        >
                            Hủy
                        </button>

                        {/* YES */}

                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="
                                rounded-lg
                                cursor-pointer
                                bg-blue-600

                                px-5
                                py-2

                                text-sm
                                font-semibold
                                text-white

                                shadow-md

                                transition-all

                                hover:bg-blue-700
                                hover:shadow-lg

                                active:scale-95

                                pointer-events-auto
                            "
                        >
                            Xác Nhận
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================================================
       TOAST
    ========================================================= */

    return (
        <div
            className={`
                pointer-events-auto

                w-[360px]
                max-w-[calc(100vw-32px)]

                rounded-lg

                border
                ${current.borderClass}

                bg-white

                shadow-lg

                animate-in
                slide-in-from-right-5
                fade-in
                duration-300
            `}
        >
            <div className="flex gap-3 p-3.5">
                {/* ICON */}

                <Icon
                    size={21}
                    strokeWidth={2.5}
                    className={`
                        mt-0.5
                        shrink-0

                        ${current.iconClass}
                    `}
                />

                {/* CONTENT */}

                <div className="min-w-0 flex-1">
                    {title && (
                        <div
                            className="
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >
                            {title}
                        </div>
                    )}

                    <div
                        className={`
                            text-sm
                            leading-5
                            text-gray-500

                            ${title ? "mt-1" : ""}
                        `}
                    >
                        {message}
                    </div>
                </div>

                {/* CLOSE */}

                <button
                    type="button"
                    onClick={() => onClose(id)}
                    className="
                        flex
                        h-6
                        w-6
                        shrink-0

                        items-center
                        justify-center

                        rounded

                        text-gray-400

                        transition

                        hover:bg-gray-100
                        hover:text-gray-700

                        active:scale-95

                        pointer-events-auto
                    "
                    aria-label="Đóng"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}