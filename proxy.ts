import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret key dùng để verify JWT (Phải trùng với key ở API login)
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'goku-super-saiyan-secret-key'
);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Lấy refreshToken từ HttpOnly Cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 1. Danh sách các trang bắt buộc phải ĐĂNG NHẬP mới cho vào (VD: Nạp thẻ)
    const protectedRoutes = ['/nap-the-123123'];

    const isProtectedRoute = protectedRoutes.some((path) =>
        pathname.startsWith(path)
    );

    if (isProtectedRoute) {
        // Nếu không có Cookie -> Đá về trang chủ ngay lập tức
        if (!refreshToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        try {
            // Xác thực token xem có hợp lệ / hết hạn không
            await jwtVerify(refreshToken, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            // Token bị sửa đổi/giả mạo hoặc hết hạn -> Đá về trang chủ
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

// 2. Cấu hình matcher để Middleware chỉ chạy trên các đường dẫn cần thiết (tối ưu hiệu năng)
export const config = {
    matcher: ['/nap-the/:path*'],
};