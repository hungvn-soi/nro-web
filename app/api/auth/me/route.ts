import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ngoc_rong_zenz_super_secret_key_2026_@123';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Verify token từ Cookie
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        return NextResponse.json({
            authenticated: true,
            user: {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                cash: decoded.cash,
                isAdmin: decoded.isAdmin,
            },
        });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}