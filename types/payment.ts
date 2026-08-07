export interface IPayment {
    "paymentId": number,
    "amount": string,
    "orderCode": string
    "expiredAt": string
    "qrUrl": string
}

export interface ICreatePaymentInput {
    userId: number;
    amount: number;
    orderCode: string;
    paymentMethod: "bank" | "card";
    expiredAt: Date;
}

export interface IPaymentHistory {
    id: number,
    userId: number,
    orderCode: string,
    paymentMethod: "bank" | "card",
    amount: number,
    createdAt: Date,
    status: string,
}
