"use client";

import { useState } from "react";
import {
    User,
    Mail,
    List,
    Pencil,
    ChevronDown,
    ShieldCheck,
    Send,
} from "lucide-react";
import LoadingOverlay from "../LoadingOverlay";

interface FormData {
    fullName: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const res = await fetch("/api/contact/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            // Nếu API trả lỗi (400, 500,...)
            if (!res.ok || !result.success) {
                throw new Error(result.message || "Có lỗi xảy ra.");
            }

            console.log(result);

            alert("Gửi báo lỗi thành công");
            handleResetFormData();

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Đã xảy ra lỗi không xác định.");
            }
        } finally {
            setIsLoading(false);
        }

    };

    const handleResetFormData = () => {
        setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
        })
    }


    return (
        <section className="relative mx-auto max-w-4xl rounded-2xl border border-blue-900/70 bg-[#071C3D]/90 p-8 shadow-[0_0_40px_rgba(30,64,175,0.25)]">
            {/* Title */}
            <div className="mb-8 text-center">
                <div className="mb-2 flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500" />
                    <h2 className="text-4xl font-bold uppercase tracking-wide text-yellow-400">
                        Gửi Liên Hệ
                    </h2>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500" />
                </div>

                <p className="text-gray-300">
                    Bạn có câu hỏi, góp ý hoặc cần hỗ trợ? Hãy gửi tin nhắn cho chúng tôi!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Họ tên */}
                <div className="relative">
                    <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="h-14 w-full rounded-lg border border-slate-600 bg-[#132847]/80 pl-12 pr-4 text-white outline-none transition focus:border-yellow-500"
                    />
                </div>

                {/* Email */}
                <div className="relative">
                    <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-14 w-full rounded-lg border border-slate-600 bg-[#132847]/80 pl-12 pr-4 text-white outline-none transition focus:border-yellow-500"
                    />
                </div>

                {/* Chủ đề */}
                <div className="relative">
                    <List
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <ChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />

                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-14 w-full appearance-none rounded-lg border border-slate-600 bg-[#132847]/80 pl-12 pr-12 text-white outline-none transition focus:border-yellow-500"
                    >
                        <option value="">Chủ đề *</option>
                        <option value="support">Hỗ trợ</option>
                        <option value="feedback">Góp ý</option>
                        <option value="other">Khác</option>
                    </select>
                </div>

                {/* Nội dung */}
                <div className="relative">
                    <Pencil className="absolute left-4 top-5 text-gray-400" size={18} />

                    <textarea
                        name="message"
                        placeholder="Nội dung tin nhắn *"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full resize-none rounded-lg border border-slate-600 bg-[#132847]/80 py-4 pl-12 pr-4 text-white outline-none transition focus:border-yellow-500"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-b from-yellow-400 to-yellow-500 text-xl font-bold uppercase text-[#1a2238] transition hover:brightness-110 active:scale-[0.99]"
                >
                    <Send size={20} />
                    Gửi Liên Hệ
                </button>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 pt-2 text-sm text-green-400">
                    <ShieldCheck size={18} />
                    Thông tin của bạn sẽ được bảo mật và chỉ dùng để hỗ trợ.
                </div>
            </form>

            {/* Animation */}

            <LoadingOverlay
                show={isLoading}
            />
        </section>
    );
}