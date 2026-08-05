import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "ngoc_rong_zenz_super_secret_key_2026_@123";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    cash: number;
    isAdmin: boolean;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

        return decoded;
    } catch {
        return null;
    }
}