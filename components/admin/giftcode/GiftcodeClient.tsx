"use client"
import BoxStast, { IBoxStatsAdmin } from "../BoxStast"
import TitleAdmin from "../TitlePage/titleAdmin"
import { Share2, Timer, CircleDollarSign, TimerOff, Search } from "lucide-react";
import TableGiftCode from "./TableGiftClode";
import { ICreateGiftcode, IStasGiftCode, IViewTableGiftCode } from "@/types/giftcode";
import { ReactNode, useEffect, useMemo, useState } from "react";
import GiftModel from "./GiftModel";
import { IItemTemplate } from "@/models/itemTemplate";
import { useNotification } from "@/components/notification";


interface IGiftCodeClient {
    dataStust: IStasGiftCode
    dataTableGiftCode: IViewTableGiftCode[]
    opitonItem: IItemTemplate[]
}
interface IBoxStats {
    id: keyof IStasGiftCode,
    icon: ReactNode,
    title: ReactNode,
    value: number
}

const GiftCodeClient = ({ dataStust, dataTableGiftCode, opitonItem }: IGiftCodeClient) => {
    const notify = useNotification();
    const [dataBox, setDataBox] = useState<IBoxStatsAdmin[]>()
    const [dataViewTable, setDataViewTable] = useState<IViewTableGiftCode[]>(dataTableGiftCode)
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>("")

    //Data Box Stust
    const dataBoxStast: IBoxStats[] = [
        {
            id: "totalGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-blue-200 rounded-2xl">
                    <Share2 color="blue" />
                </div>
            ),
            title: "Tổng GiftCode",
            value: 100
        },
        {
            id: "activeGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-green-200 rounded-2xl">
                    <Timer color="green" />
                </div>
            ),
            title: "Đang hoạt động",
            value: 100
        },
        {
            id: "expiredGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-[#89818340] rounded-2xl">
                    <CircleDollarSign color="yellow" />
                </div>
            ),
            title: "Hết hạn sử dụng",
            value: 100
        },
        {
            id: "usedGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-red-200 rounded-2xl">
                    <TimerOff color="red" />
                </div>
            ),
            title: "Đã sử dụng",
            value: 100
        },
    ]
    useEffect(()=>{
        if(!dataStust) return

        const newDataStast:IBoxStats[] = dataBoxStast.map(item => ({
            ...item,
            value: Number(dataStust[item.id])
        }))
        setDataBox(newDataStast)
    }, [dataStust])

    const handleAddGiftCode = () => {
        setIsOpenModel(true)
    }

    const filterGiftCode = (data: IViewTableGiftCode[], keySearch: string) => {
        const keyword = keySearch.trim().toLowerCase();
        let result = [...data]
        if (keyword) {
            result = result.filter((payment) => {
                return (
                    payment.code
                        ?.toLowerCase()
                        .includes(keyword) ||

                    String(payment.countLeft)
                        ?.toLowerCase()
                        .includes(keyword) ||

                    String(payment.datecreate)
                        .toLowerCase()
                        .includes(keyword) ||

                    String(payment.usedCount)
                        .includes(keyword)
                );
            });
        }

        return result
    }

    useMemo(() => {
        const dataViewTable = filterGiftCode(dataTableGiftCode, keyword);
        setDataViewTable(dataViewTable)
    }, [dataTableGiftCode, keyword]);



    const handleActionModel = async (data:ICreateGiftcode) => {
        await handleCreateGoiNap(data)
    }

    const handleCreateGoiNap = async (create: ICreateGiftcode) => {
        try {

            const res = await fetch(`/api/admin/giftCode/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(create),
            })

            const dataRes = await res.json()

            if (!dataRes.success) {
                notify.error(dataRes.message || "Không thể  tạo giftCode")
                return
            }

            setIsOpenModel(false)
            // Chỉ thông báo success ở đây
            notify.success(dataRes.message)

            // Chỉ reload data, không notify
            // await handleRefetchData()
    
        } catch (error) {
            console.log("tạo giftCode nạp lỗi:",error)
            notify.error("Đã có lỗi xảy ra")
        } 
        }

    return(
        <div className="px-5">
            <TitleAdmin
                title="Quản lý GiftCode"
                subTitle="Quản lý tất cả giftCode"
                actionAdd={handleAddGiftCode}
            />
            <div className="grid grid-cols-4 gap-2 mt-5">
                {
                    dataBox && dataBox.map((box, index) => (
                        <BoxStast
                            key={index}
                            icon= {box.icon}
                            title={box.title}
                            value={box.value}
                            classBox="border-gray-200/70"
                        />

                    ))
                }
            </div>

            <div className="flex justify-start items-center mt-5">
                <div className="flex items-end gap-4">
                    <label className="block text-[20px] font-bold text-black">
                        Tìm kiếm
                    </label>

                    <div className="flex justify-between items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Nhập order code, username hoặc transaction ID..."
                                className="
                                h-9 w-full rounded-md border border-slate-200
                                bg-white pl-3 pr-9 text-[16px] text-slate-700
                                outline-none transition
                                placeholder:text-slate-400
                                hover:border-slate-300
                                focus:border-indigo-400
                                focus:ring-2 focus:ring-indigo-100
                            "
                            />

                            <Search
                                className="
                                pointer-events-none absolute right-3 top-1/2
                                h-3.5 w-3.5 -translate-y-1/2 text-slate-400
                            "
                            />
                        </div>
                    </div>

                    
                </div>

                
            </div>

            <div className="mt-5">
                <TableGiftCode
                    dataInGiftCode={dataViewTable}
                />
            </div>


            {/**
             * Model
             */}

             {
                isOpenModel && (
                    <GiftModel
                        optionItemSelect={opitonItem}
                        open = {isOpenModel}
                        onClose={() => setIsOpenModel(!isOpenModel)}
                        actionModel={handleActionModel}
                    />
                )
             }
        </div>
    )
}
export default GiftCodeClient