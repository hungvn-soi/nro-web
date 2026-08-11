import { db } from '@/db';
import { account } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

type DBTransaction = Parameters<
    Parameters<typeof db.transaction>[0]
>[0];
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

// Nạp Cash
export async function addCashAndRecharge(
    tx: DBTransaction,
    userId: number,
    amount: number
) {
    if (!Number.isInteger(amount) || amount <= 0) {
        throw new Error("Số tiền nạp không hợp lệ");
    }

    if (amount < 10_000) {
        throw new Error(
            "Số tiền nạp tối thiểu là 10.000"
        );
    }

    const result = await tx
        .update(account)
        .set({
            cash: sql`${account.cash} + ${amount}`,
            danap: sql`${account.danap} + ${amount}`,
        })
        .where(eq(account.id, userId));

    return result;
}