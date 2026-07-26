'use client';

import { useAuth } from '@/lib/context/AuthContext'; // Sửa path cho đúng
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal() {
    const { authMode, closeAuthModal, openAuthModal } = useAuth();

    if (!authMode) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
            {/* Container Modal mang phong cách Game UI */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#2a1b12] to-[#150d08] border-2 border-amber-600/60 rounded-2xl shadow-2xl overflow-hidden p-6 text-white">

                {/* Nút Đóng */}
                <button
                    onClick={closeAuthModal}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors border border-amber-500/30 font-bold"
                >
                    ✕
                </button>

                {/* Header Tabs */}
                <div className="flex border-b border-amber-500/30 mb-6 font-bold text-sm">
                    <button
                        onClick={() => openAuthModal('login')}
                        className={`flex-1 py-2.5 text-center transition-all ${authMode === 'login'
                                ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/10'
                                : 'text-gray-400 hover:text-amber-200'
                            }`}
                    >
                        ĐĂNG NHẬP
                    </button>
                    <button
                        onClick={() => openAuthModal('register')}
                        className={`flex-1 py-2.5 text-center transition-all ${authMode === 'register'
                                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                                : 'text-gray-400 hover:text-blue-200'
                            }`}
                    >
                        ĐĂNG KÝ
                    </button>
                </div>

                {/* Nội dung Form */}
                <div className="relative z-10">
                    {authMode === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}