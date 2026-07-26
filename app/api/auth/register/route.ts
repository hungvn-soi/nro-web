import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // 👈 1. Import thêm cookies
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '@/models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'nro_zenz_secret_key_2026';

export async function POST(request: Request) {
    try {
        const { username, password, confirmPassword, email } = await request.json();

        // 1. Validate dữ liệu
        if (!username || !password || !confirmPassword) {
            return NextResponse.json(
                { message: 'Vui lòng điền đầy đủ thông tin!' },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: 'Mật khẩu nhập lại không khớp!' },
                { status: 400 }
            );
        }

        // 2. Check trùng username
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return NextResponse.json(
                { message: 'Tên tài khoản này đã được sử dụng!' },
                { status: 400 }
            );
        }

        // 3. Tạo tài khoản mới
        await createUser(username, password, email);

        // 4. Lấy lại user vừa tạo
        const newUser = await findUserByUsername(username);
        if (!newUser) {
            return NextResponse.json(
                { message: 'Có lỗi khi tạo tài khoản!' },
                { status: 500 }
            );
        }

        // 5. Chuẩn bị thông tin Token
        const userPayload = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            cash: newUser.cash,
            isAdmin: newUser.isAdmin,
        };

        const accessToken = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '1d' });

        // 👈 2. Ghi trực tiếp Cookie bằng cookies() của Next.js (Bao ăn 100%)
        const cookieStore = await cookies();
        cookieStore.set('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 ngày
            path: '/',
        });

        return NextResponse.json({
            success: true,
            message: 'Đăng ký thành công! Đang tự động đăng nhập...',
            user: userPayload,
            accessToken,
        });
    } catch (error) {
        console.error('Lỗi Register API:', error);
        return NextResponse.json(
            { message: 'Có lỗi xảy ra khi tạo tài khoản!' },
            { status: 500 }
        );
    }
}