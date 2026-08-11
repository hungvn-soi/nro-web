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
     * =========================================================
     * NOTIFICATION CONFIG
     * =========================================================
     */

    const config = {
        success: {
            icon: CheckCircle2,

            iconClass: "text-emerald-600",
            iconBgClass: "bg-emerald-50",

            borderClass: "border-emerald-100",

            accentClass: "bg-emerald-500",
            progressClass: "bg-emerald-500",

            buttonClass:
                "bg-emerald-600 hover:bg-emerald-700",
        },

        error: {
            icon: XCircle,

            iconClass: "text-red-600",
            iconBgClass: "bg-red-50",

            borderClass: "border-red-100",

            accentClass: "bg-red-500",
            progressClass: "bg-red-500",

            buttonClass:
                "bg-red-600 hover:bg-red-700",
        },

        warning: {
            icon: AlertTriangle,

            iconClass: "text-amber-600",
            iconBgClass: "bg-amber-50",

            borderClass: "border-amber-100",

            accentClass: "bg-amber-500",
            progressClass: "bg-amber-500",

            buttonClass:
                "bg-amber-500 hover:bg-amber-600",
        },

        confirm: {
            icon: HelpCircle,

            iconClass: "text-blue-600",
            iconBgClass: "bg-blue-50",

            borderClass: "border-blue-100",

            accentClass: "bg-blue-500",
            progressClass: "bg-blue-500",

            buttonClass:
                "bg-blue-600 hover:bg-blue-700",
        },
    };

    const current = config[type];

    const Icon = current.icon;

    /**
     * =========================================================
     * CONFIRM
     * =========================================================
     */

    const handleConfirm = () => {
        onConfirm?.();
        onClose(id);
    };

    /**
     * =========================================================
     * CANCEL
     * =========================================================
     */

    const handleCancel = () => {
        onCancel?.();
        onClose(id);
    };

    /**
     * =========================================================
     * CONFIRM MODAL
     * =========================================================
     */

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

                    bg-black/40
                    backdrop-blur-[2px]

                    pointer-events-auto

                    animate-in
                    fade-in
                    duration-200
                "
            >
                {/* =================================================
                    MODAL
                ================================================= */}

                <div
                    className="
                        relative

                        w-full
                        max-w-[440px]

                        overflow-hidden

                        rounded-2xl

                        border
                        border-gray-200

                        bg-white

                        shadow-[0_20px_70px_rgba(0,0,0,0.18)]

                        animate-in
                        fade-in
                        zoom-in-95
                        duration-200
                    "
                >
                    {/* TOP ACCENT */}

                    <div
                        className={`
                            absolute
                            top-0
                            left-0
                            right-0

                            h-1

                            ${current.accentClass}
                        `}
                    />

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            {/* ICON */}

                            <div
                                className={`
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center

                                    rounded-full

                                    ${current.iconBgClass}
                                `}
                            >
                                <Icon
                                    size={25}
                                    strokeWidth={2.2}
                                    className={current.iconClass}
                                />
                            </div>

                            {/* TEXT */}

                            <div className="min-w-0 flex-1 pt-0.5">
                                {title && (
                                    <h3
                                        className="
                                            text-[16px]
                                            font-semibold
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

                            {/* CLOSE */}

                            <button
                                type="button"
                                onClick={() => onClose(id)}
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0

                                    items-center
                                    justify-center

                                    rounded-lg

                                    text-gray-400

                                    transition-all
                                    duration-150

                                    hover:bg-gray-100
                                    hover:text-gray-600

                                    active:scale-95

                                    cursor-pointer
                                "
                                aria-label="Đóng"
                            >
                                <X size={18} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-end
                            gap-2

                            border-t
                            border-gray-100

                            bg-gray-50/70

                            px-6
                            py-4
                        "
                    >
                        {/* CANCEL */}

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="
                                h-9

                                rounded-lg

                                border
                                border-gray-200

                                bg-white

                                px-4

                                text-sm
                                font-medium
                                text-gray-600

                                shadow-sm

                                transition-all
                                duration-150

                                hover:border-gray-300
                                hover:bg-gray-50
                                hover:text-gray-800

                                active:scale-[0.98]

                                cursor-pointer
                            "
                        >
                            Hủy
                        </button>

                        {/* CONFIRM */}

                        <button
                            type="button"
                            onClick={handleConfirm}
                            className={`
                                h-9

                                rounded-lg

                                px-4

                                text-sm
                                font-semibold
                                text-white

                                shadow-sm

                                transition-all
                                duration-150

                                ${current.buttonClass}

                                hover:shadow-md

                                active:scale-[0.98]

                                cursor-pointer
                            `}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * =========================================================
     * TOAST
     * =========================================================
     */

    return (
        <div
            className="
                pointer-events-auto

                w-[380px]
                max-w-[calc(100vw-32px)]

                overflow-hidden

                rounded-xl

                border
                border-gray-200

                bg-white

                shadow-[0_10px_35px_rgba(0,0,0,0.12)]

                animate-in
                slide-in-from-right-5
                fade-in
                duration-300
            "
        >
            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="flex items-start gap-3.5 p-4">
                {/* ICON */}

                <div
                    className={`
                        flex
                        h-9
                        w-9
                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        ${current.iconBgClass}
                    `}
                >
                    <Icon
                        size={19}
                        strokeWidth={2.4}
                        className={current.iconClass}
                    />
                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1 pt-0.5">
                    {title && (
                        <div
                            className="
                                text-[14px]
                                font-semibold
                                leading-5
                                text-gray-900
                            "
                        >
                            {title}
                        </div>
                    )}

                    <div
                        className={`
                            text-[14px]
                            leading-5
                            text-gray-500

                            ${title
                                ? "mt-0.5"
                                : ""
                            }
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
                        h-7
                        w-7
                        shrink-0

                        items-center
                        justify-center

                        rounded-md

                        text-gray-400

                        transition-all
                        duration-150

                        hover:bg-gray-100
                        hover:text-gray-600

                        active:scale-95

                        cursor-pointer
                    "
                    aria-label="Đóng"
                >
                    <X
                        size={17}
                        strokeWidth={2}
                    />
                </button>
            </div>

            {/* =================================================
                PROGRESS / ACCENT
            ================================================= */}

            <div className="h-[3px] w-full bg-gray-100">
                <div
                    className={`
                        h-full
                        w-full

                        origin-left

                        ${current.progressClass}

                        animate-[notification-progress_linear]
                    `}
                />
            </div>
        </div>
    );
}