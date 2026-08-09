export type NotificationType =
    | "success"
    | "error"
    | "warning"
    | "confirm";

export type NotificationPosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

export interface NotificationOptions {
    /**
     * Tiêu đề - không bắt buộc
     */
    title?: string;

    /**
     * Nội dung - bắt buộc
     */
    message: string;

    /**
     * Loại thông báo
     */
    type?: NotificationType;

    /**
     * Thời gian tự đóng Toast
     * Đơn vị: milliseconds
     */
    duration?: number;

    /**
     * Khi bấm Yes
     */
    onConfirm?: () => void;

    /**
     * Khi bấm No
     */
    onCancel?: () => void;
}

export interface NotificationItem extends NotificationOptions {
    id: string;
}