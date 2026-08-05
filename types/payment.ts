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
