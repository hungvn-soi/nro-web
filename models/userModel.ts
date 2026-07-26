import { db } from '@/db';
import { account } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Tim tài khoản theo username trong Database
export async function findUserByUsername(username: string) {
    const result = await db
        .select()
        .from(account)
        .where(eq(account.username, username))
        .limit(1);

    return result[0] || null;
}

// 2. Tạo tài khoản mới
export async function createUser(username: string, password: string, email?: string) {
    const [result] = await db.insert(account).values({
        username,
        password,
        email: email || null,
    })
}