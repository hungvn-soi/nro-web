"use client"
import { IPaymentStatus, IPaymentTableALL } from "@/types/payment"
import TitleAdmin from "../TitlePage/titleAdmin"
import {
    WalletCards,
    ReceiptText,
    CircleCheck,
    Clock3,
    CircleX,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BoxStastInfo from "../goi-Nap/statsInfo";
import PaymentFilter from "./PaymentFilter";
import PaymentTable from "./PaymentTable";
import PaymentInfo from "./PaymentInfo";

type StatId = "totalRevenue" | "totalTransactions" | "completed" | "pending" | "error";
export interface StatCard {
    id: StatId;
    icon: React.ReactNode;
    title: React.ReactNode;
    value: number;
}

const dataMauStats: StatCard[] = [
    {
        id: "totalRevenue",
        icon: (
            <div className="bg-blue-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <WalletCards color="blue" />
            </div>
        ),
        title: (
            <div className="text-black font-bold text-2xl">Tổng doanh thu</div>
        ),
        value: 0
    },
    {
        id: "totalTransactions",
        icon: (
            <div className="bg-green-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <ReceiptText color="green" />
            </div>
        ),
        title: (
            <div className="text-green-400 font-bold text-2xl">Tổng giao dịch</div>
        ),
        value: 0
    },
    {
        id: "completed",
        icon: (
            <div className="bg-red-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <CircleCheck color="red" />
            </div>
        ),
        title: (
            <div className="text-black font-bold text-2xl">Thành Công</div>
        ),
        value: 0
    },
    {
        id: "pending",
        icon: (
            <div className="bg-yellow-100/50 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <Clock3 color="#e5ac03" />
            </div>
        ),
        title: "Đang chờ",
        value: 0
    },
    {
        id: "error",
        icon: (
            <div className="bg-red-300 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <CircleX color="red" />
            </div>
        ),
        title: "Thất bại",
        value: 0
    }
]

type SearchParams = {
    keyword: string;
    status: string;
    method: string;
    fromDate: string;
    toDate: string;
    tab: string;
};

interface IHistoryPaymentProps {
    statusPayment: IPaymentStatus
    historyPlayments: IPaymentTableALL[]
}

const HistoryClient = ({ statusPayment, historyPlayments }: IHistoryPaymentProps) => {
    const [statsView, setStatsView] = useState < StatCard[]>(dataMauStats)
    const [payments, setPayments] = useState<IPaymentTableALL[]>(historyPlayments);
    const [paymentInfo, setPaymentInfo] = useState<IPaymentTableALL | null> (null)

    const [searchParams, setSearchParams] =
        useState<SearchParams>({
            keyword: "",
            status: "",
            method: "",
            fromDate: "",
            toDate: "",
            tab: "all",
        });


    //Sử lý data views status
    useEffect (()=> {
        if (!statusPayment) return
        const data = dataMauStats.map((item) => ({
            ...item,
            value: statusPayment[item.id]
        }))
        setStatsView(data)
    }, [statusPayment])

    //Sử lý data search trả data table
    const filterPayments = (
        data: IPaymentTableALL[],
        params: SearchParams
    ): IPaymentTableALL[] => {
        let result = [...data];

        // =========================
        // KEYWORD
        // =========================
        const keyword = params.keyword.trim().toLowerCase();

        if (keyword) {
            result = result.filter((payment) => {
                return (
                    payment.orderCode
                        ?.toLowerCase()
                        .includes(keyword) ||

                    payment.sepayTransactionId
                        ?.toLowerCase()
                        .includes(keyword) ||

                    String(payment.userId)
                        .toLowerCase()
                        .includes(keyword) ||

                    String(payment.amount)
                        .includes(keyword)
                );
            });
        }

        // =========================
        // STATUS
        // =========================
        if (params.status && params.status !== "all") {
            result = result.filter(
                (payment) => payment.status === params.status
            );
        }

        // =========================
        // PAYMENT METHOD
        // =========================
        if (params.method && params.method !== "all") {
            result = result.filter(
                (payment) =>
                    payment.paymentMethod === params.method
            );
        }

        // =========================
        // FROM DATE
        // =========================
        if (params.fromDate) {
            const fromDate = new Date(params.fromDate);
            fromDate.setHours(0, 0, 0, 0);

            result = result.filter((payment) => {
                const createdAt = new Date(payment.createdAt);

                return createdAt >= fromDate;
            });
        }

        // =========================
        // TO DATE
        // =========================
        if (params.toDate) {
            const toDate = new Date(params.toDate);
            toDate.setHours(23, 59, 59, 999);

            result = result.filter((payment) => {
                const createdAt = new Date(payment.createdAt);

                return createdAt <= toDate;
            });
        }

        return result;
    };

    //Sử lý data views table
    const searchedPayments = useMemo(() => {
        return filterPayments(payments, searchParams);
    }, [payments, searchParams]);


    const handleSearch = (params: {
        keyword: string;
        status: string;
        method: string;
        fromDate: string;
        toDate: string;
        tab: string;
    }) => {
        setSearchParams(params)
    };

    return (
        <div className="">
            <TitleAdmin
                title="Quản lý gói nạp"
                subTitle="Quản lý tất cả gói nạp, ngọc nhân,..."
                viewAdd = {false}
            />

            <div className="grid grid-cols-5 gap-x-2 px-5 mt-5">
                {
                    statsView && statsView.map((item, index) => (
                        <div className="" key={index}>
                            <BoxStastInfo
                                id={item.id}
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                value={item.value}
                            />
                        </div>
                    ))
                }
            </div>

            <div className="grid grid-cols-[70%_25%] gap-3 mt-5 p-6">
                {/** LEFT */}
                <div>
                    <div className="border-2 border-gray-300 rounded-2xl p-2">
                        <PaymentFilter
                            counts={{
                                all: 342,
                                success: 328,
                                pending: 8,
                                expired: 4,
                                error: 2,
                            }}
                            onSearch={handleSearch}
                        />

                        <div className="mt-6">
                            <PaymentTable
                                dataTable={searchedPayments}
                                actionInfo={(row) => setPaymentInfo(row)}
                            />
                        </div>

                       
                    </div>


                </div>

                {/** RIGHT */}
                <div className="border-2 border-gray-300 rounded-xl p-2">
                    <PaymentInfo
                        payemt={paymentInfo}
                    />
                </div>
            </div>
        </div>
    )
}

export default HistoryClient