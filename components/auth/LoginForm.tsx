'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext'; // Sửa path cho đúng vị trí AuthContext của bạn

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await login(username, password);
        setLoading(false);

        if (!res.success) {
            setError(res.message || 'Đã có lỗi xảy ra');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-2 rounded text-center">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-xs text-amber-200/80 mb-1 font-semibold uppercase">Tên đăng nhập</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-amber-500/30 rounded text-amber-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
            </div>

            <div>
                <label className="block text-xs text-amber-200/80 mb-1 font-semibold uppercase">Mật khẩu</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123123"
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-amber-500/30 rounded text-amber-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
            </div>


            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold uppercase rounded shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
                {loading ? 'Đợi Zeno trả lời' : 'ĐĂNG NHẬP'}
            </button>

        </form>
    );
}