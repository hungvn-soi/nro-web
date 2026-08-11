import { db } from "@/db";
import { rechargePackages } from "@/db/schema";
import { ICreateRechargePackage, IRechargePackage, IRechargePackageClient, IRechargePackageStats, IUpdateRechargePackage } from "@/types/rechargePackage";
import { asc, eq, sql } from "drizzle-orm";





/**
 * Lấy các gói nạp đang hoạt động.
 *
 * Dùng cho:
 * - Trang nạp tiền phía người dùng.
 * - Hiển thị danh sách gói nạp.
 *
 * Sắp xếp theo sortOrder tăng dần.
 */
export async function getActiveRechargePackages(): Promise<IRechargePackageClient[]> {
    return await db
        .select({
            id: rechargePackages.id,
            price: rechargePackages.price,
            gem: rechargePackages.gem,
            status: rechargePackages.status,
            sortOrder: rechargePackages.sortOrder,
        })
        .from(rechargePackages)
        .where(eq(rechargePackages.status, 1))
        .orderBy(asc(rechargePackages.sortOrder));
}


/**
 * 
 * Lấy thông tin start cho admin page
 * 
 */
export async function getRechargePackageStats(): Promise<IRechargePackageStats> {
    const result = await db
        .select({
            total: sql<number>`COUNT(*)`,
            active: sql<number>`
                SUM(CASE WHEN ${rechargePackages.status} = 1 THEN 1 ELSE 0 END)
            `,
            inactive: sql<number>`
                SUM(CASE WHEN ${rechargePackages.status} = 0 THEN 1 ELSE 0 END)
            `,
            totalGem: sql<number>`
                COALESCE(SUM(${rechargePackages.gem}), 0)
            `,
        })
        .from(rechargePackages);

    const stats = result[0];

    return {
        total: Number(stats?.total ?? 0),
        active: Number(stats?.active ?? 0),
        inactive: Number(stats?.inactive ?? 0),
        totalGem: Number(stats?.totalGem ?? 0),
    };
}

/**
 * Lấy toàn bộ gói nạp.
 *
 *
 * Sắp xếp theo sortOrder tăng dần.
 */
export async function getAllRechargePackages(): Promise<IRechargePackage[]> {
    const packages = await db
        .select()
        .from(rechargePackages)
        .orderBy(asc(rechargePackages.sortOrder));

    return packages.map((item) => ({
        ...item,
        status: Boolean(item.status),
    }));
}

/**
 * Lấy một gói nạp theo ID.
 *
 * Dùng cho:
 * - Trang Admin chỉnh sửa gói.
 * - Kiểm tra gói trước khi cập nhật / xóa.
 *
 * @param id ID của gói nạp.
 *
 * @returns
 * - Trả về gói nạp nếu tìm thấy.
 * - Trả về null nếu không tồn tại.
 */
export async function getRechargePackageById(id: number) {
    const result = await db
        .select()
        .from(rechargePackages)
        .where(eq(rechargePackages.id, id))
        .limit(1);

    return result[0] ?? null;
}


/**
 * Tạo một gói nạp mới.
 *
 * Dùng cho:
 * - Admin thêm gói nạp mới.
 *
 * Giá trị mặc định:
 * - status = 1 → gói được bật ngay.
 * - sortOrder = 0 → nếu Admin không truyền thứ tự.
 *
 * @param data Thông tin gói nạp cần tạo.
 */
export async function createRechargePackage(
    data: ICreateRechargePackage
) {
    if (data.price <= 0) {
        throw new Error("Giá trị gói nạp chưa đúng! Vui Lòng kiểm tra lại");
    }

    const result = await db
        .insert(rechargePackages)
        .values({
            price: data.price,
            gem: data.gem,
            status: data.status === true ? 1 : 0,
            sortOrder: data.sortOrder ?? 0,
        });

    return result;
}


/**
 * Cập nhật thông tin một gói nạp.
 *
 * Có thể cập nhật một hoặc nhiều trường:
 * - price
 * - gem
 * - status
 * - sortOrder
 *
 * @param id ID gói nạp cần cập nhật.
 * @param data Các dữ liệu muốn thay đổi.
 */
export async function updateRechargePackage(
    id: number,
    data: IUpdateRechargePackage
) {
    return await db
        .update(rechargePackages)
        .set(data)
        .where(eq(rechargePackages.id, id));
}

/**
 * Xóa một gói nạp.
 *
 * Dùng cho:
 * - Admin xóa vĩnh viễn gói nạp.
 *
 * @param id ID gói nạp cần xóa.
 */
export async function deleteRechargePackage(id: number) {
    return await db
        .delete(rechargePackages)
        .where(eq(rechargePackages.id, id));
}
