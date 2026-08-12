import type { MetadataRoute } from "next";
import { db } from "@/db";
import { event } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://ngocrongzenz.com";

    const staticRoutes = [
        { path: "", priority: 1, changeFrequency: "daily" as const },
        { path: "/download", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/nap-the", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/event", priority: 0.8, changeFrequency: "daily" as const },
        { path: "/guide", priority: 0.7, changeFrequency: "weekly" as const },
        { path: "/ranking", priority: 0.7, changeFrequency: "daily" as const },
        { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
        { path: "/report", priority: 0.4, changeFrequency: "monthly" as const },
    ];

    // Lấy toàn bộ event để Google index từng trang event riêng
    const events = await db.select({ id: event.id }).from(event);

    const eventRoutes: MetadataRoute.Sitemap = events.map((item) => ({
        url: `${baseUrl}/event/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    return [
        ...staticRoutes.map((route) => ({
            url: `${baseUrl}${route.path}`,
            lastModified: new Date(),
            changeFrequency: route.changeFrequency,
            priority: route.priority,
        })),
        ...eventRoutes,
    ];
}