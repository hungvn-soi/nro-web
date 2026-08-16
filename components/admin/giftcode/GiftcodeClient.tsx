"use client"
import BoxStast, { IBoxStatsAdmin } from "../BoxStast"
import TitleAdmin from "../TitlePage/titleAdmin"
import { Share2, Timer, CircleDollarSign, TimerOff, Search } from "lucide-react";
import TableGiftCode from "./TableGiftClode";
import { ICreateGiftcode, IGiftcode, IStasGiftCode, IUpdateGiftcode, IViewTableGiftCode } from "@/types/giftcode";
import { ReactNode, useEffect, useState } from "react";
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

const filterGiftCode = (data: IViewTableGiftCode[], keySearch: string) => {
    const keyword = keySearch.trim().toLowerCase();
    if (!keyword) return data;

    return data.filter((payment) => {
        return (
            payment.code?.toLowerCase().includes(keyword) ||
            String(payment.countLeft)?.toLowerCase().includes(keyword) ||
            String(payment.datecreate).toLowerCase().includes(keyword) ||
            String(payment.usedCount).includes(keyword)
        );
    });
}

const GiftCodeClient = ({ dataStust, dataTableGiftCode, opitonItem }: IGiftCodeClient) => {
    const notify = useNotification();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataBox, setDataBox] = useState<IBoxStatsAdmin[]>()
    const [dataViewTable, setDataViewTable] = useState<IViewTableGiftCode[]>(dataTableGiftCode)
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>("")
    const [type, setType] = useState<"Create" | "Edit" | null>(null)
    const [itemSelect, setItemSelect] = useState<IViewTableGiftCode | null>(null)

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
            value: 0
        },
        {
            id: "activeGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-green-200 rounded-2xl">
                    <Timer color="green" />
                </div>
            ),
            title: "Đang hoạt động",
            value: 0
        },
        {
            id: "expiredGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-[#89818340] rounded-2xl">
                    <CircleDollarSign color="yellow" />
                </div>
            ),
            title: "Hết hạn sử dụng",
            value: 0
        },
        {
            id: "usedGiftcodes",
            icon: (
                <div className="flex justify-center items-center h-[60px] w-[60px] bg-red-200 rounded-2xl">
                    <TimerOff color="red" />
                </div>
            ),
            title: "Đã sử dụng",
            value: 0
        },
    ]

    useEffect(() => {
        if (!dataStust) return

        const newDataStast: IBoxStats[] = dataBoxStast.map(item => ({
            ...item,
            value: Number(dataStust[item.id])
        }))
        setDataBox(newDataStast)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataStust])

    // Filtering is a side effect on state (setDataViewTable), so it belongs
    // in useEffect, not useMemo. useMemo's job is to return a memoized VALUE
    // during render; React does not guarantee it will run only when deps
    // change (it may be discarded and recomputed for other reasons), so it
    // must never be relied on to trigger a setState call.
    useEffect(() => {
        const filtered = filterGiftCode(dataTableGiftCode, keyword);
        setDataViewTable(filtered)
    }, [dataTableGiftCode, keyword]);

    const handleAddGiftCode = () => {
        setType("Create")
        setIsOpenModel(true)
        setItemSelect(null)
    }

    const handleChiTietTabble = (data: IViewTableGiftCode) => {
        setType("Edit")
        setIsOpenModel(true)
        setItemSelect(data)
    }

    //Model
    const handleActionModel = async (isEdit: boolean, data: IGiftcode) => {
        if (isEdit && data.id >= 0) {
            const dataUpdate: IUpdateGiftcode = {
                id: data.id,
                code: data.code,
                countLeft: data.countLeft,
                detail: data.detail,
                expired: data.expired
            }

            await handleUpdateGiftCode(dataUpdate)
            return
        }

        if (!isEdit && data.id < 0) {
            const dataCreate: ICreateGiftcode = {
                code: data.code,
                countLeft: data.countLeft,
                datecreate: data.datecreate,
                detail: data.detail,
                expired: data.expired
            }
            await handleCreateGoiNap(dataCreate)
            return
        }

        // Trạng thái isEdit / id không khớp nhau (không nên xảy ra trong luồng
        // bình thường) - báo lỗi thay vì âm thầm không làm gì cả.
        notify.error("Dữ liệu GiftCode không hợp lệ, vui lòng thử lại");
    }

    const handleCloseResetModel = () => {
        setIsLoading(false)
        setType(null)
        setItemSelect(null)
        setIsOpenModel(false)
    }

    const handleCreateGoiNap = async (create: ICreateGiftcode) => {
        try {
            setIsLoading(true);

            const res = await fetch(`/api/admin/giftCode/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(create),
            });

            const dataRes = await res.json();

            // Có lỗi
            if (!dataRes.success) {
                notify.error(dataRes.message || "Không thể tạo giftCode");

                // Giữ nguyên model để người dùng sửa lại code
                return;
            }

            // Chỉ đóng model khi tạo thành công
            await handleRefetchData()
            handleCloseResetModel()
            notify.success(dataRes.message);
        } catch (error) {
            console.error("Tạo giftCode lỗi:", error);
            notify.error("Đã có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateGiftCode = async (update: IUpdateGiftcode) => {
        try {
            setIsLoading(true);

            const res = await fetch(`/api/admin/giftCode/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
            });

            const dataRes = await res.json();

            // Có lỗi
            if (!dataRes.success) {
                notify.error(dataRes.message || "Không cập nhật giftCode");

                // Giữ nguyên model để người dùng sửa lại code
                return;
            }

            // Chỉ đóng model khi tạo thành công
            await handleRefetchData()
            handleCloseResetModel()
            notify.success(dataRes.message);

        } catch (error) {
            console.error("Cập nhật giftCode lỗi:", error);
            notify.error("Đã có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    }

    const hanldeDetele = (id:number) => {
        notify.confirm({
            title: "Thông Báo",
            message:
                "Xóa dữ liêu !!!!, Dữ liệu không thể khôi phục!!!",
            onConfirm: () => {
                handleDeleteGiftCode(id);
            },
            
        })
    }


    const handleDeleteGiftCode = async (id:number) => {
        try {
            setIsLoading(true)

            const res = await fetch(`/api/admin/giftCode/delete?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const dataRes = await res.json();

            // Có lỗi
            if (!dataRes.success) {
                notify.error(dataRes.message || "Xóa giftCode lỗi");

                // Giữ nguyên model để người dùng sửa lại code
                return;
            }
            notify.success(dataRes.message);
            await handleRefetchData()
            
        } catch (error) {
            console.error("Lỗ xóa giftCodelỗi:", error);
            notify.error("Đã có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    }

    const handleRefetchData = async () => {
        try {
            const res = await fetch(`/api/admin/giftCode`)
            const dataRes = await res.json()

            if (dataRes.success) {
                setDataViewTable(dataRes.data)
            }
        } catch (error) {
            console.error("Làm mới dữ liệu giftCode lỗi:", error);
            notify.error("Đã có lỗi xảy ra")
        }
    }

    return (
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
                            icon={box.icon}
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
                    actionChiTiet={handleChiTietTabble}
                    dataInGiftCode={dataViewTable}
                    actionDelte={hanldeDetele}
                />
            </div>


            {/**
             * Model
             */}

            {
                isOpenModel && (
                    <GiftModel
                        itemSelect={itemSelect}
                        type={type}
                        optionItemSelect={opitonItem}
                        open={isOpenModel}
                        onClose={handleCloseResetModel}
                        actionModel={handleActionModel}
                        isLoading={isLoading}
                    />
                )
            }
        </div>
    )
}
export default GiftCodeClient