export interface IRechargePackage {
    id: number;
    price: number;
    gem: number;
    status: boolean;
    sortOrder: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IRechargePackageClient {
    id: number;
    price: number;
    gem: number;
    status: number;
    sortOrder: number;
}

export interface ICreateRechargePackage {
    price: number;
    gem: number;
    status: boolean;
    sortOrder?: number;
}

export interface IUpdateRechargePackage {
    price: number;
    gem?: number;
    status?: number;
    sortOrder?: number;
}

export interface IRechargePackageStats {
    total: number;
    active: number;
    inactive: number;
    totalGem: number;
}