import { db } from "@/db";
import { giftcode } from "@/db/schema";
import { giftcodeUsed } from "@/db/schema/giftcodeUsed";
import { ApiError } from "@/lib/ApiError";
import { ICreateGiftcode, IGiftcode, IStasGiftCode, IUpdateGiftcode, IViewTableGiftCode } from "@/types/giftcode";
import { and, desc, eq, ne, sql } from "drizzle-orm";

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

    // Kiểm tra code đã tồn tại chưa
    const existing = await db
        .select({ id: giftcode.id })
        .from(giftcode)
        .where(eq(giftcode.code, data.code))
        .limit(1);

    if (existing.length > 0) {
        throw new ApiError(
            "Giftcode đã tồn tại",
            400,
            "GIFT_CODE_EXISTS"
        );
    }

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
        throw new ApiError(
            "Không thể lấy giftcode vừa tạo",
            500,
            "GIFT_CODE_CREATE_FAILED"
        );
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

    // Nếu có thay đổi code thì kiểm tra code đã tồn tại chưa
    if (data.code) {
        const existing = await db
            .select({ id: giftcode.id })
            .from(giftcode)
            .where(
                and(
                    eq(giftcode.code, data.code),
                    ne(giftcode.id, id)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            throw new ApiError(
                "Giftcode đã tồn tại",
                400,
                "GIFT_CODE_EXISTS"
            );
        }
    }

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
        throw new ApiError(
            "Không tìm thấy giftcode",
            404,
            "GIFT_CODE_NOT_FOUND"
        );
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


/**
 * Xóa giftcode
 */
export async function deleteGiftcode(id: number) {
    // Kiểm tra giftcode có tồn tại không
    const existing = await db
        .select()
        .from(giftcode)
        .where(eq(giftcode.id, id))
        .limit(1);

    if (!existing[0]) {
        throw new ApiError(
            "Không tìm thấy giftcode",
            404,
            "GIFT_CODE_NOT_FOUND"
        );
    }

    // Xóa
    await db
        .delete(giftcode)
        .where(eq(giftcode.id, id));

    return existing[0];
}