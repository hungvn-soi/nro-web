"use client"
import { Plus } from "lucide-react";

interface ITitleAdmin {
    title: string
    subTitle: string
    actionAdd?: () => void
    viewAdd?: boolean
}
const TitleAdmin = ({ title, subTitle, actionAdd, viewAdd = true}: ITitleAdmin) => {
    return(
        <div className="w-full h-full flex justify-between items-center px-3">
            <div>
                <h1 className="font-bold text-2xl">{title}</h1>
                <p className="text-shadow-zinc-500">{subTitle}</p>
            </div>

            <div className="">
                {
                    viewAdd && (
                        <button
                            className="flex justify-center items-center py-2 px-3 bg-blue-600 hover:bg-blue-800 rounded-xl active:scale-0.8 text-white"
                            onClick={actionAdd}
                        >
                            <Plus size={20} />
                            Thêm gói nạp
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default TitleAdmin