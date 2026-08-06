"use client";

import {
    ClipboardPen,
    User,
    MapPinned,
    Bug,
    FileText,
    ChevronDown,
    Send,
    RotateCcw
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";

const formNone = {
    account: "",
    character: "",
    map: "",
    bugType: "",
    title: "",
    description: "",
}
interface IFormDataReport {
    account: string,
    character: string,
    map: string,
    bugType: string,
    title: string,
    description: string,
}


const BugReportForm = () =>  {
    const {user} = useAuth()
    const [formData, setFormData] = useState<IFormDataReport>(formNone);

    useEffect(() => {
        if(!user) return
        setFormData(prve => ({
            ...prve,
            account: user.username
        }))
    },[user])

    //handle onchang form
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle submit form
    const handleSubmitForm = () => {
        if(!formData.account || !formData.character) {
            alert("Tài khoản or Tên nhân vật không được để trống")
            return
        }

        console.log("data ta form submit: ", formData)
    }

    //handle reset form
    const handleResetFormData = () => {
        setFormData(formNone)
    }

    return (
        <div className="rounded-xl border border-slate-700 bg-[#0b1220]/90 p-6 shadow-lg">
            {/* Header */}
            <div className="mb-6 flex items-center gap-2">
                <ClipboardPen className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-bold text-slate-100">
                    THÔNG TIN BÁO LỖI
                </h2>
            </div>

            <form className="space-y-5">
                {/* Account */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                        Tài khoản <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                        <input
                            type="text"
                            name="account"
                            value={formData.account}
                            onChange={handleChange}
                            placeholder="Nhập tài khoản của bạn"
                            className="h-12 w-full rounded-lg border border-slate-700 bg-slate-800 pl-10 pr-4 text-white outline-none transition focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Character + Map */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">
                            Nhân vật bị lỗi <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                            <input
                                type="text"
                                name="character"
                                value={formData.character}
                                onChange={handleChange}
                                placeholder="Tên nhân vật"
                                className="h-12 w-full rounded-lg border border-slate-700 bg-slate-800 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">
                            Map xảy ra lỗi
                        </label>

                        <div className="relative">
                            <MapPinned className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                            <select 
                                className="h-12 w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 pl-10 pr-10 text-slate-300 outline-none focus:border-blue-500"
                                name="map"
                                value={formData.map}
                                onChange={handleChange}
                            >
                                <option>Chọn map</option>
                                <option>Làng Aru</option>
                                <option>Làng Mori</option>
                                <option>Làng Kakarot</option>
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>
                    </div>
                </div>

                {/* Type */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                        Loại lỗi <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <Bug className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                        <select 
                            className="h-12 w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 pl-10 pr-10 text-slate-300 outline-none focus:border-blue-500"
                            name="bugType"
                            value={formData.bugType}
                            onChange={handleChange}    
                        >
                            <option>Chọn loại lỗi</option>
                            <option>Lỗi nhiệm vụ</option>
                            <option>Lỗi Item</option>
                            <option>Lỗi Skill</option>
                            <option>Lỗi Hiển thị</option>
                            <option>Lỗi Disconnect</option>
                            <option>Lỗi khác</option>
                        </select>

                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                        Tiêu đề <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Nhập tiêu đề ngắn gọn về lỗi"
                            className="h-12 w-full rounded-lg border border-slate-700 bg-slate-800 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                        Mô tả chi tiết <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={7}
                        placeholder="Mô tả chi tiết lỗi bạn gặp phải (càng chi tiết càng tốt)..."
                        className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-blue-500"
                    />
                </div>
            </form>

            <div className="flex justify-between items-center mt-3">
                <button 
                    className="px-4 py-2 border border-blue-200 hover:bg-blue-600 cursor-pointer rounded-xl flex justify-center items-center  text-white gap-2"
                    onClick={() => handleResetFormData()}    
                >
                    <RotateCcw />
                    Đặt lại
                </button>

                <button 
                    className="px-4 py-2 bg-blue-400 rounded-xl flex justify-center items-center hover:bg-blue-600 cursor-pointer text-white gap-2"
                    onClick={() => handleSubmitForm()}    
                >
                    <Send />
                    Gửi báo lỗi
                </button>
            </div>
        </div>
    );
}

export default BugReportForm