import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'goku-super-saiyan-secret-key';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Verify token từ Cookie
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;

        return NextResponse.json({
            authenticated: true,
            user: {
                id: decoded.id,
                username: decoded.username,
                name: decoded.name,
                role: decoded.role,
            },
        });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}