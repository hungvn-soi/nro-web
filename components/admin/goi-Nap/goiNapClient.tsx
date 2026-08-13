"use client"
import { CircleCheck, EyeOff, Gem, Layers3 } from "lucide-react"
import TitleAdmin from "../TitlePage/titleAdmin"
import BoxStastInfo from "./statsInfo"
import { ICreateRechargePackage, IRechargePackage, IRechargePackageStats, IUpdateRechargePackage } from "@/types/rechargePackage"
import { useEffect, useState } from "react"
import TableGoiNap from "./tableGoiNap"
import ModelGoiNap from "./model"
import { useNotification } from "@/components/notification"

type StatId = "total" | "active" | "inactive" | "totalGem";

export interface StatCard {
    id: StatId;
    icon: React.ReactNode;
    title: React.ReactNode;
    value: number;
}

const dataMauStats: StatCard[] = [
    {
        id: "total",
        icon: (
            <div className="bg-blue-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <Layers3 color="blue" />
            </div>
        ),
        title: (
            <div className="text-black font-bold text-2xl">Tổng gói</div>
        ),
        value: 0
    },
    {
        id:"active",
        icon: (
            <div className="bg-green-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <CircleCheck color="green" />
            </div>
        ),
        title: (
            <div className="text-green-400 font-bold text-2xl">Đang hiển thị</div>
        ),
        value: 0
    },
    {
        id:"inactive",
        icon: (
            <div className="bg-red-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <EyeOff color="red" />
            </div>
        ),
        title: (
            <div className="text-black font-bold text-2xl">Đang ẩn</div>
        ),
        value: 0
    },
    {
        id:"totalGem",
        icon: (
            <div className="bg-red-200 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                <Gem />
            </div>
        ),
        title: "Tổng ngọc",
        value: 0
    }
]

interface IGoiNapClient {
    statsGoi: IRechargePackageStats
    tableGoiNap: IRechargePackage[]

}   

const GoiNapClient = ({ statsGoi, tableGoiNap }:IGoiNapClient) => {
    const notify = useNotification();
    const [tableView, setTableView] = useState<IRechargePackage[]>(tableGoiNap)
    const [statsView, setStatsView] = useState<StatCard[]>(dataMauStats)
    const [isModel, setIsModel] = useState<boolean>(false)
    const [selectGoiNap, setSelectGoiNap] = useState<IRechargePackage | null>(null)
    const [typeModel, setTypeModel] = useState<"Edit" | "Create" | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect (()=> {
        if(!statsGoi) return
        const data = dataMauStats.map((item) => ({
            ...item,
            value: statsGoi[item.id]
        }))
        setStatsView(data)
    },[statsGoi])


    //Handle Thêm mới gói nạp
    const handleAddGoiNap = () => {
        setTypeModel("Create")
        setIsModel(!isModel)
        setSelectGoiNap(null)
    }

    //Handle Action Tible
    const handleActionTible = (type: "Edit" | "Delete", row: IRechargePackage)=>{
        if(type === "Edit"){
            setIsModel(!isModel)
            setTypeModel(type)
            setSelectGoiNap(row)
            return
        }

        if(type === "Delete"){
            notify.confirm({
                title:"Xóa Gói Nạp",
                message:"Bạn có chắc chắn xóa - dữ liệu sẽ không thể khôi phục",
                onConfirm: () => {
                    handleDeleteGoiNap(row);
                },
            })

        }
    }

    //Handle Action Model
    const handleActionModel = async (isEdit: boolean, data:IRechargePackage) => {
        if(isEdit){
            if(data.id <= 0 || data.price <= 0){
                notify.error("Vui lòng kiểm tra lại giá và id")
                return 
            }
            const dataUpdate: IUpdateRechargePackage = {
                price: data.price,
                gem: data.gem,
                sortOrder: data.sortOrder,
                status: data.status === true ? 1 : 0
            } 

            await handleUpdateData(data.id, dataUpdate)
            setSelectGoiNap(null)
            setTypeModel(null)
            setIsModel(false)
        }
        if(!isEdit){
            try {
                setIsLoading(true)
                if (!data.id || !data.createdAt || !data.updatedAt) {
                    const dataCreate = {
                        price: data.price,
                        gem: data.gem,
                        status: data.status,
                        sortOrder: data.sortOrder
                    }
                    await handleCreateGoiNap(dataCreate)
                }
                setSelectGoiNap(null)
                setTypeModel(null)
            } catch (error) {
                console.log("tạo gói nạp lỗi:", error)
                notify.error(
                    "Đã có lối xảy ra"
                )
            } finally {
                setIsLoading(false)
            }
        }
    }

    //Handle Xóa Gói Nạp
    const handleDeleteGoiNap = async (goinap: IRechargePackage) => {
        const res = await fetch(`/api/admin/goinap/delete?id=${goinap.id}`, { method: "DELETE" });
        const dataRes = await res.json();
        
        if (dataRes.success){
            notify.success(
                dataRes.message
            )
            handleRefetchData()

        }
    }

    const handleCreateGoiNap = async (create: ICreateRechargePackage) => {
        try {

            const res = await fetch(`/api/admin/goinap/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(create),
            })

            const dataRes = await res.json()

            if (!dataRes.success) {
                notify.error(dataRes.message || "Không thể thêm gói nạp")
                return
            }

            setIsModel(false)
            // Chỉ thông báo success ở đây
            notify.success(dataRes.message)

            // Chỉ reload data, không notify
            await handleRefetchData()

        } catch (error) {
            console.log("tạo gói nạp lỗi:",error)
            notify.error("Đã có lỗi xảy ra")
        } 
    }

    const handleUpdateData = async (id:number, dataUpdate: IUpdateRechargePackage) => {
        if (!id || id <= 0) {
            notify.error("ID không hợp lệ vui lòng kiểm tra lại")
            return
        }

        if (!dataUpdate || dataUpdate.price <= 0) {
            notify.error("Giá trị gói nạp không được là: 0")
            return
        }
        try {
            setIsLoading(true)

            const res = await fetch(`/api/admin/goinap/update?id=${id}`,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataUpdate),
            })
            const dataRes = await res.json()

            if (!dataRes.success) {
                notify.error(dataRes.message || "Đã có lỗi cập nhật")
                return
            }

            setIsModel(false)
            notify.success(dataRes.message)
            await handleRefetchData()

        } catch (error) {
            notify.error("Đã có lỗi xảy ra")
        } finally { setIsLoading(false) }
    }

    const handleRefetchData = async () => {
        try {
            setIsLoading(true)

            const res = await fetch(`/api/admin/goinap`)
            const dataRes = await res.json()

            if (dataRes.success) {
                setTableView(dataRes.data)
            }
        } catch (error) {
            notify.error("Đã có lỗi xảy ra")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative">
            <TitleAdmin
                title="Quản lý gói nạp"
                subTitle="Quản lý tất cả gói nạp, ngọc nhân,..."
                actionAdd={handleAddGoiNap}
            />

            <div className="flex justify-around items-center gap-3 mx-10 mt-6">
                {
                    statsView && statsView.map ((item, index) => (
                       <div className="w-[30%]" key={index}>
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

            <div className="mt-5">
                <TableGoiNap
                    dataGoiNap={tableView}
                    actionTible={handleActionTible}
                />
            </div>


            {
                isModel && (
                    <ModelGoiNap
                        isloading={isLoading}
                        type={typeModel}
                        onClose={() => setIsModel(!isModel)}
                        dataForm={selectGoiNap}
                        actionModel={handleActionModel}
                    />
                )
            }
        </div>
    )
}

export default GoiNapClient