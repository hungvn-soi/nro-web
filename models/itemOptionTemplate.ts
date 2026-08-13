import { db } from "@/db";
import { itemOptionTemplate } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface IItemOptionTemplate {
    id: number;
    name: string;
}

/**
 * Lấy tất cả item option template
 */
export async function getAllItemOptionTemplates(): Promise<
    IItemOptionTemplate[]
> {
    return await db
        .select({
            id: itemOptionTemplate.id,
            name: itemOptionTemplate.name,
        })
        .from(itemOptionTemplate);
}

/**
 * Lấy option theo ID
 */
export async function getItemOptionTemplateById(
    id: number
): Promise<IItemOptionTemplate | null> {
    const result = await db
        .select({
            id: itemOptionTemplate.id,
            name: itemOptionTemplate.name,
        })
        .from(itemOptionTemplate)
        .where(eq(itemOptionTemplate.id, id))
        .limit(1);

    return result[0] ?? null;
}