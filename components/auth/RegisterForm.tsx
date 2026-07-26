'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext'; // 👈 Import useAuth

export default function RegisterForm() {
    const { register } = useAuth(); // 👈 Lấy hàm register từ Context

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Mật khẩu nhập lại không khớp!');
            setLoading(false);
            return;
        }

        // 🚀 Gọi hàm register từ Context
        const result = await register({ username, email, password, confirmPassword });

        if (result.success) {
            setSuccess('🎉 Đăng ký thành công!');
            // Context sẽ tự set user và tự đóng Modal luôn!
        } else {
            setError(result.message || 'Đăng ký thất bại');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
                <div className="p-2.5 text-xs text-red-300 bg-red-900/40 border border-red-500/40 rounded text-center">
                    ⚠️ {error}
                </div>
            )}

            {success && (
                <div className="p-2.5 text-xs text-green-300 bg-green-900/40 border border-green-500/40 rounded text-center">
                    {success}
                </div>
            )}

            <div>
                <label className="block text-xs text-blue-200/80 mb-1 font-semibold uppercase">Tên tài khoản</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên tài khoản"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded text-blue-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                />
            </div>

            <div>
                <label className="block text-xs text-blue-200/80 mb-1 font-semibold uppercase">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    disabled={loading}
                    className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded text-blue-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                />
            </div>

            <div>
                <label className="block text-xs text-blue-200/80 mb-1 font-semibold uppercase">Mật khẩu</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded text-blue-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                />
            </div>

            <div>
                <label className="block text-xs text-blue-200/80 mb-1 font-semibold uppercase">Xác nhận mật khẩu</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded text-blue-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold uppercase rounded shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
                {loading ? 'ĐANG XỬ LÝ...' : 'TẠO TÀI KHOẢN MỚI'}
            </button>
        </form>
    );
}