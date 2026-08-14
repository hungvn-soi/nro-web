import { db } from "@/db";
import { giftcode } from "@/db/schema";
import { giftcodeUsed } from "@/db/schema/giftcodeUsed";
import { ICreateGiftcode, IGiftcode, IStasGiftCode, IUpdateGiftcode, IViewTableGiftCode } from "@/types/giftcode";
import { desc, eq, sql } from "drizzle-orm";

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


/**
 * 
 * Get data table admin
 */
export async function getAllGiftcodesV2(): Promise<IViewTableGiftCode[]> {
    return await db
        .select({
            id: giftcode.id,
            code: giftcode.code,

            // Tổng số lượng giftcode
            countLeft: giftcode.countLeft,

            // Số lần đã sử dụng
            usedCount: sql<number>`
                COUNT(${giftcodeUsed.giftcodeId})
            `,

            detail: giftcode.detail,
            datecreate: giftcode.datecreate,
            expired: giftcode.expired,
        })
        .from(giftcode)
        .leftJoin(
            giftcodeUsed,
            eq(giftcode.id, giftcodeUsed.giftcodeId)
        )
        .groupBy(
            giftcode.id,
            giftcode.code,
            giftcode.countLeft,
            giftcode.detail,
            giftcode.datecreate,
            giftcode.expired
        )
        .orderBy(desc(giftcode.id));
}


/***
 * Get info Stast Info
 */
export async function getGiftcodeStats(): Promise<IStasGiftCode> {
    const [result] = await db
        .select({
            // Tổng số loại giftcode
            totalGiftcodes: sql<number>`
                COUNT(${giftcode.id})
            `,

            // Giftcode chưa hết hạn
            activeGiftcodes: sql<number>`
                SUM(
                    CASE
                        WHEN ${giftcode.expired} > NOW()
                        THEN 1
                        ELSE 0
                    END
                )
            `,

            // Giftcode đã hết hạn
            expiredGiftcodes: sql<number>`
                SUM(
                    CASE
                        WHEN ${giftcode.expired} <= NOW()
                        THEN 1
                        ELSE 0
                    END
                )`,
        })
        .from(giftcode);

    const [usedResult] = await db
        .select({
            // Tổng số lượt sử dụng
            usedGiftcodes: sql<number>`
                COUNT(*)
            `,
        })
        .from(giftcodeUsed);

    return {
        totalGiftcodes: result?.totalGiftcodes.toString() ?? 0,
        activeGiftcodes: result?.activeGiftcodes.toString() ?? 0,
        expiredGiftcodes: result?.expiredGiftcodes.toString() ?? 0,
        usedGiftcodes: usedResult?.usedGiftcodes.toString() ?? 0,
    };
}