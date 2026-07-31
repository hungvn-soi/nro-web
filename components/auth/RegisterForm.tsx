"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";

export default function RegisterForm() {
    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateForm = () => {
        if (email && !/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email)) {
            return "Email phải có dạng @gmail.com";
        }

        if (password.length < 6) {
            return "Mật khẩu phải có ít nhất 6 ký tự";
        }

        const missing: string[] = [];

        if (!/[a-z]/.test(password)) {
            missing.push("chữ thường");
        }

        if (!/[A-Z]/.test(password)) {
            missing.push("chữ hoa");
        }

        if (!/[0-9]/.test(password)) {
            missing.push("số");
        }

        if (missing.length > 0) {
            return `Mật khẩu phải có ${missing.join(", ")}`;
        }

        if (password !== confirmPassword) {
            return "Mật khẩu nhập lại không khớp!";
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        const validateError = validateForm();

        if (validateError) {
            setError(validateError);
            setLoading(false);
            return;
        }

        const result = await register({
            username,
            email,
            password,
            confirmPassword,
        });

        if (result.success) {
            setSuccess("🎉 Đăng ký thành công!");
        } else {
            setError(result.message || "Đăng ký thất bại");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
                <div className="rounded border border-red-500/40 bg-red-900/40 p-2.5 text-center text-xs text-red-300">
                    ⚠️ {error}
                </div>
            )}

            {success && (
                <div className="rounded border border-green-500/40 bg-green-900/40 p-2.5 text-center text-xs text-green-300">
                    {success}
                </div>
            )}

            {/* Username */}
            <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-blue-200/80">
                    Tên tài khoản <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên tài khoản"
                    required
                    disabled={loading}
                    className="w-full rounded border border-blue-500/30 bg-black/40 px-3 py-2 text-blue-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none disabled:opacity-50"
                />
            </div>

            {/* Email */}
            <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-blue-200/80">
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    disabled={loading}
                    className="w-full rounded border border-blue-500/30 bg-black/40 px-3 py-2 text-blue-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none disabled:opacity-50"
                />

                <p className="mt-1 text-[11px] text-zinc-400">
                    Không bắt buộc. Nếu nhập phải có dạng{" "}
                    <span className="text-blue-300">@gmail.com</span>.
                </p>
            </div>

            {/* Password */}
            <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-blue-200/80">
                    Mật khẩu <span className="text-red-500">*</span>
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                    disabled={loading}
                    className="w-full rounded border border-blue-500/30 bg-black/40 px-3 py-2 text-blue-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none disabled:opacity-50"
                />

                <p className="mt-1 text-[11px] text-zinc-400">
                    Mật khẩu tối thiểu <span className="text-blue-300">6 ký tự</span>,
                    gồm ít nhất <span className="text-blue-300">1 chữ hoa</span>,{" "}
                    <span className="text-blue-300">1 chữ thường</span> và{" "}
                    <span className="text-blue-300">1 số</span>.
                </p>
            </div>

            {/* Confirm Password */}
            <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-blue-200/80">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    required
                    disabled={loading}
                    className="w-full rounded border border-blue-500/30 bg-black/40 px-3 py-2 text-blue-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none disabled:opacity-50"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded bg-gradient-to-r from-blue-600 to-cyan-600 py-2.5 font-bold uppercase text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-500 active:scale-[0.98] disabled:opacity-50"
            >
                {loading ? "ĐANG XỬ LÝ..." : "TẠO TÀI KHOẢN MỚI"}
            </button>
        </form>
    );
}