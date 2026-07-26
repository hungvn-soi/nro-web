'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthMode = 'login' | 'register' | null;

interface User {
    id: string;
    username: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    authMode: AuthMode;
    openAuthModal: (mode: 'login' | 'register') => void;
    closeAuthModal: () => void;
    login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
    // 🟢 1. THÊM HÀM REGISTER VÀ CHECKAUTH VÀO TYPE
    register: (data: { username: string; email?: string; password: string; confirmPassword: string }) => Promise<{ success: boolean; message?: string }>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [authMode, setAuthMode] = useState<AuthMode>(null);

    // Hàm kiểm tra auth
    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated) {
                    setUser(data.user);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Lỗi kiểm tra phiên đăng nhập:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const openAuthModal = (mode: 'login' | 'register') => setAuthMode(mode);
    const closeAuthModal = () => setAuthMode(null);

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setUser(data.user);
                closeAuthModal();
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Đăng nhập thất bại' };
            }
        } catch (err) {
            return { success: false, message: 'Lỗi kết nối Server' };
        }
    };

    // 🟢 2. VIẾT HÀM REGISTER TỰ ĐỘNG CẬP NHẬT USER VÀ ĐÓNG MODAL
    const register = async (formData: { username: string; email?: string; password: string; confirmPassword: string }) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setUser(data.user); // ⚡ Auto Login ngay lập tức!
                closeAuthModal();   // ⚡ Tự động đóng Popup luôn!
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Đăng ký thất bại' };
            }
        } catch (err) {
            return { success: false, message: 'Lỗi kết nối Server' };
        }
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                authMode,
                openAuthModal,
                closeAuthModal,
                login,
                register,  // 👈 Export ra
                checkAuth, // 👈 Export ra
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};