"use client"
import { formatNumber } from "@/utils/format"
import { ReactNode } from "react"

export interface IBoxStatsInfo {
    id?:string
    icon: ReactNode
    title: ReactNode
    value: number
    classBox?: string
}

export interface IBoxStatsAdmin {
    id?: string
    icon: ReactNode
    title: ReactNode
    value: number
}

const BoxStast = ({ id, icon, title, value, classBox }: IBoxStatsInfo) => {
    return (
        <div className="flex justify-around items-center gap-3">
            <div className={`border-2 border-amber-300 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white flex items-center p-5 gap-6 w-full ${classBox}`} >
                {icon}
                <div>
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <span className="text-xl font-bold">{formatNumber(value)}</span>
                </div>
             </div>
        </div>
    )
}
export default BoxStast