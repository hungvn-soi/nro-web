import { db } from "@/db";
import { giftcode } from "@/db/schema";
import { ICreateGiftcode, IGiftcode, IUpdateGiftcode } from "@/types/giftcode";
import { eq } from "drizzle-orm";

/**
 * Lấy tất cả giftcode
 */
export async function getAllGiftcodes(): Promise<IGiftcode[]> {
    return await db
        .select()
        .from(giftcode);
}

/**
 * Tạo giftcode mới
 */
export async function createGiftcode(
    data: ICreateGiftcode
): Promise<IGiftcode> {
    const result = await db
        .insert(giftcode)
        .values({
            code: data.code,
            countLeft: data.countLeft,
            detail: data.detail,
            datecreate: new Date(),
            expired: data.expired,
        });

    const insertId = result[0].insertId;

    const created = await db
        .select()
        .from(giftcode)
        .where(eq(giftcode.id, insertId))
        .limit(1);

    if (!created[0]) {
        throw new Error("Không thể lấy giftcode vừa tạo");
    }

    return created[0];
}

/**
 * Cập nhật giftcode
 */
export async function updateGiftcode(
    data: IUpdateGiftcode
): Promise<IGiftcode> {
    const { id, ...updateData } = data;

    await db
        .update(giftcode)
        .set(updateData)
        .where(eq(giftcode.id, id));

    const updated = await db
        .select()
        .from(giftcode)
        .where(eq(giftcode.id, id))
        .limit(1);

    if (!updated[0]) {
        throw new Error("Không tìm thấy giftcode");
    }

    return updated[0];
}