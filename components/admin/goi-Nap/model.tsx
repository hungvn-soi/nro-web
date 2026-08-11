"use client"

import LoadingOverlay from "@/components/LoadingOverlay"
import { IRechargePackage } from "@/types/rechargePackage"
import { formatNumber } from "@/utils/format"
import { useEffect, useState } from "react"

interface IModelGoiNap {
    type: "Edit" | "Create" | null
    onClose: () => void
    dataForm: IRechargePackage | null
    actionModel: (isEdit: boolean, data: IRechargePackage) => void
    isloading: boolean
}

const ModelGoiNap = ({ type, onClose, actionModel, dataForm, isloading}: IModelGoiNap)=> {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const isEdit = type === "Edit"
    const [formData, setFormData] = useState<IRechargePackage>({
        id: 0,
        price: 0,
        gem: 0,
        status: true,
        sortOrder: 0,
    })

    useEffect(()=> {
        setIsLoading(isLoading)
    },[isloading])

    useEffect(()=> {
        if(!dataForm) {
            setFormData({
                id: 0,
                price: 0,
                gem: 0,
                status: true,
                sortOrder: 0,
            })
            return
        }
        setFormData(dataForm)
    }, [dataForm])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAction = () => {
        actionModel(isEdit, formData)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-[400px] rounded-lg bg-white shadow-xl">
                <LoadingOverlay 
                    show={isloading}
                />
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <h2 className="text-[16px] font-semibold text-gray-900">
                        {isEdit ? "Cập nhật gói nạp" : "Thêm mới gói nạp"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[22px] leading-none text-gray-500 hover:text-gray-800"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleAction()
                    }}
                    className="px-5 py-4">
                    {/* Giá nạp */}
                    <div className="mb-4">
                        <label className="mb-2 block text-[13px] font-medium text-gray-800">
                            Giá nạp (VND) <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min={0}
                            max={2147483647}
                            placeholder="Ví dụ: 100000"
                            required
                            className="h-[38px] w-full rounded-md border border-gray-200 px-3 text-[13px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Ngọc nhận được */}
                    <div className="mb-4">
                        <label className="mb-2 block text-[13px] font-medium text-gray-800">
                            Ngọc nhận được <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="number"
                            name="gem"
                            min={0}
                            max={2147483647}
                            value={formatNumber(formData.gem)}
                            onChange={handleChange}
                            placeholder="Ví dụ: 1200"
                            required
                            className="h-[38px] w-full rounded-md border border-gray-200 px-3 text-[13px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-[13px] font-medium text-gray-800">
                            Thứ tự hiển thị <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="number"
                            name="sortOrder"
                            value={formData.sortOrder}
                            onChange={handleChange}
                            required
                            className="h-[38px] w-full rounded-md border border-gray-200 px-3 text-[13px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Trạng thái */}
                    <div className="mb-5">
                        <label className="mb-2 block text-[13px] font-medium text-gray-800">
                            Trạng thái
                        </label>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({
                                    ...prev,
                                    status: !formData.status
                                }))}
                                className={`relative h-6 w-11 rounded-full transition-colors ${formData.status ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${formData.status ? "translate-x-5" : "translate-x-0"
                                        }`}
                                />

                            </button>


                            <span className="text-[12px] text-gray-600">
                                {formData.status ? "Đang hiển thị":"Không hiển thị"}
                            </span>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-[38px] min-w-[78px] rounded-md border border-gray-200 bg-white px-4 text-[13px] text-gray-700 hover:bg-gray-50"
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className="h-[38px] min-w-[80px] rounded-md bg-blue-600 px-4 text-[13px] font-medium text-white hover:bg-blue-700"
                        >
                            {isEdit ? "Lưu Cập Nhật" : "Lưu Thêm Mới"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModelGoiNap