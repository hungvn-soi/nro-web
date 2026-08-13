"use client"
import { formatNumber } from "@/utils/format"
import { ReactNode } from "react"

export interface IBoxStatsInfo {
    id:string
    icon: ReactNode
    title: ReactNode
    value: number
}

const BoxStastInfo = ({ icon, title, value}: IBoxStatsInfo) => {
    return (
        <div className="flex justify-around items-center gap-3">
            <div  className="border-2 border-amber-300 rounded-xl flex p-5 gap-6 w-full">
                {icon}
                <div>
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <span className="text-xl font-bold">{formatNumber(value)}</span>
                </div>
             </div>
        </div>
    )
}
export default BoxStastInfo