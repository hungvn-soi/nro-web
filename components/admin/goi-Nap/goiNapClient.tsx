"use client"
import { CircleCheck, EyeOff, Gem, Layers3 } from "lucide-react"
import TitleAdmin from "../TitlePage/titleAdmin"
import BoxStastInfo from "./statsInfo"
import { IRechargePackage, IRechargePackageStats } from "@/types/rechargePackage"
import { useEffect, useState } from "react"
import TableGoiNap from "./tableGoiNap"
import ModelGoiNap from "./model"
import { useNotification } from "@/components/notification"

type StatId = "total" | "active" | "inactive" | "totalGem";

interface StatCard {
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
    const [statsView, setStatsView] = useState<StatCard[]>(dataMauStats)
    const [isModel, setIsModel] = useState<boolean>(false)
    const [selectGoiNap, setSelectGoiNap] = useState<IRechargePackage | null>(null)
    const [typeModel, setTypeModel] = useState<"Edit" | "Create" | null>(null)

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

            // const confirmDelete = window.confirm(
            //     `Bạn có chắc muốn xóa gói nạp STT: "${row.id}" - "${row.price}" không?`
            // );

            // if (confirmDelete) {
            //     handleDeleteGoiNap(row);
            // }
        }
    }

    //Handle Action Model
    const handleActionModel = (isEdit: boolean, data:IRechargePackage) => {
        if(isEdit){
            console.log("Cập nhật lại gói nạp: ", data)
            setSelectGoiNap(null)
            setTypeModel(null)
            return
        }
        if(!isEdit){
            console.log("Tạo mới gói nạp: ", data)
            setSelectGoiNap(null)
            setTypeModel(null)
            return
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
        }
        console.log("check data res: ", dataRes)
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
                    dataGoiNap={tableGoiNap}
                    actionTible={handleActionTible}
                />
            </div>


            {
                isModel && (
                    <ModelGoiNap
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