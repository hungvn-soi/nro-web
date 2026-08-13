import { db } from "@/db";
import { itemTemplate } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface IItemTemplate {
    id: number;
    name: string;
    iconId: number;
}

/**
 * Lấy tất cả item template
 */
export async function getAllItemTemplates(): Promise<IItemTemplate[]> {
    return await db
        .select({
            id: itemTemplate.id,
            name: itemTemplate.name,
            iconId: itemTemplate.iconId,
        })
        .from(itemTemplate);
}

/**
 * Lấy item template theo ID
 */
export async function getItemTemplateById(
    id: number
): Promise<IItemTemplate | null> {
    const result = await db
        .select({
            id: itemTemplate.id,
            name: itemTemplate.name,
            iconId: itemTemplate.iconId,
        })
        .from(itemTemplate)
        .where(eq(itemTemplate.id, id))
        .limit(1);

    return result[0] ?? null;
}