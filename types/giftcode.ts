export interface IGiftcode {
    id: number;
    code: string;
    countLeft: number;
    detail: string;
    datecreate: Date;
    expired: Date;
}

export interface ICreateGiftcode {
    code: string;
    countLeft: number;
    detail: string;
    expired: Date;
}

export interface IUpdateGiftcode {
    id: number;
    code?: string;
    countLeft?: number;
    detail?: string;
    expired?: Date;
}