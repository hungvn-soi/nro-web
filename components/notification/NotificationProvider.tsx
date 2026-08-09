"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";

import NotificationItemComponent from "./NotificationItem";

import {
    NotificationItem,
    NotificationOptions,
    NotificationPosition,
} from "./notification.types";

interface NotificationContextType {
    notify: {
        show: (options: NotificationOptions) => void;

        success: (
            options: NotificationOptions | string
        ) => void;

        error: (
            options: NotificationOptions | string
        ) => void;

        warning: (
            options: NotificationOptions | string
        ) => void;

        confirm: (
            options: NotificationOptions
        ) => void;

        close: (id: string) => void;
    };
}

const NotificationContext =
    createContext<NotificationContextType | null>(null);

interface NotificationProviderProps {
    children: ReactNode;

    /**
     * Vị trí Toast
     *
     * Confirm luôn nằm giữa màn hình
     */
    position?: NotificationPosition;
}

export function NotificationProvider({
    children,
    position = "top-right",
}: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<
        NotificationItem[]
    >([]);

    /**
     * Đóng notification
     */
    const close = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.filter((item) => item.id !== id)
        );
    }, []);

    /**
     * Hiển thị notification
     */
    const show = useCallback(
        (options: NotificationOptions) => {
            const id = crypto.randomUUID();

            const notification: NotificationItem = {
                id,
                type: "success",
                duration: 4000,
                ...options,
            };

            setNotifications((prev) => [
                ...prev,
                notification,
            ]);

            /**
             * Confirm KHÔNG tự đóng
             */
            if (notification.type === "confirm") {
                return;
            }

            /**
             * Toast tự đóng
             */
            const duration =
                notification.duration ?? 4000;

            if (duration <= 0) {
                return;
            }

            setTimeout(() => {
                close(id);
            }, duration);
        },
        [close]
    );

    /**
     * SUCCESS
     */
    const success = useCallback(
        (options: NotificationOptions | string) => {
            if (typeof options === "string") {
                show({
                    type: "success",
                    message: options,
                });

                return;
            }

            show({
                ...options,
                type: "success",
            });
        },
        [show]
    );

    /**
     * ERROR
     */
    const error = useCallback(
        (options: NotificationOptions | string) => {
            if (typeof options === "string") {
                show({
                    type: "error",
                    message: options,
                });

                return;
            }

            show({
                ...options,
                type: "error",
            });
        },
        [show]
    );

    /**
     * WARNING
     */
    const warning = useCallback(
        (options: NotificationOptions | string) => {
            if (typeof options === "string") {
                show({
                    type: "warning",
                    message: options,
                });

                return;
            }

            show({
                ...options,
                type: "warning",
            });
        },
        [show]
    );

    /**
     * CONFIRM
     */
    const confirm = useCallback(
        (options: NotificationOptions) => {
            show({
                ...options,
                type: "confirm",
            });
        },
        [show]
    );

    /**
     * Xác định vị trí Toast
     */
    const getPositionClass = () => {
        switch (position) {
            case "top-left":
                return "top-4 left-4";

            case "top-right":
                return "top-4 right-4";

            case "bottom-left":
                return "bottom-4 left-4";

            case "bottom-right":
                return "bottom-4 right-4";

            default:
                return "top-4 right-4";
        }
    };

    return (
        <NotificationContext.Provider
            value={{
                notify: {
                    show,
                    success,
                    error,
                    warning,
                    confirm,
                    close,
                },
            }}
        >
            {children}

            {/* =====================================================
                TOAST CONTAINER
            ===================================================== */}

            <div
                className={`
                    fixed
                    z-[9999]

                    flex
                    flex-col
                    gap-3

                    ${getPositionClass()}

                    pointer-events-none

                    w-auto
                `}
            >
                {notifications
                    .filter(
                        (notification) =>
                            notification.type !== "confirm"
                    )
                    .map((notification) => (
                        <NotificationItemComponent
                            key={notification.id}
                            notification={notification}
                            onClose={close}
                        />
                    ))}
            </div>

            {/* =====================================================
                CONFIRM CONTAINER
                Tách riêng khỏi Toast Container
                để không bị pointer-events-none
            ===================================================== */}

            {notifications
                .filter(
                    (notification) =>
                        notification.type === "confirm"
                )
                .map((notification) => (
                    <NotificationItemComponent
                        key={notification.id}
                        notification={notification}
                        onClose={close}
                    />
                ))}
        </NotificationContext.Provider>
    );
}

/**
 * Hook sử dụng notification
 */
export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification must be used inside NotificationProvider"
        );
    }

    return context.notify;
}