import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserByUsername } from '@/models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'ngoc_rong_zenz_super_secret_key_2026_@123';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // 1. Validate dữ liệu đầu vào
        if (!username || !password) {
            return NextResponse.json(
                { message: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!' },
                { status: 400 }
            );
        }

        // 2. Tìm user trong MySQL
        const user = await findUserByUsername(username);

        if (!user) {
            return NextResponse.json(
                { message: 'Tài khoản không tồn tại!' },
                { status: 401 }
            );
        }

        // 3. So sánh mật khẩu Plain Text
        if (user.password !== password) {
            return NextResponse.json(
                { message: 'Mật khẩu không chính xác!' },
                { status: 401 }
            );
        }

        // 4. Kiểm tra tài khoản có bị Ban không
        if (user.ban === 1) {
            return NextResponse.json(
                { message: 'Tài khoản của bạn đã bị khóa!' },
                { status: 403 }
            );
        }

        // 5. Chuẩn bị thông tin lưu vào JWT
        const userPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            cash: user.cash,
            isAdmin: user.isAdmin === 0 ? false : true,
        };

        // 6. Tạo Token JWT
        const accessToken = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            success: true,
            message: 'Đăng nhập thành công!',
            user: userPayload,
            accessToken,
        });

        // Set Token vào Cookie để duy trì đăng nhập
        response.cookies.set('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 ngày
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Lỗi Login API:', error);
        return NextResponse.json(
            { message: 'Lỗi hệ thống hoặc kết nối Database!' },
            { status: 500 }
        );
    }
}