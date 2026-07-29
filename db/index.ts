import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const dbUrl =
    process.env.DATABASE_URL ??
    "mysql://root:@localhost:3306/nro_game";

// Singleton Pool (tránh tạo nhiều pool khi Next.js Hot Reload)
const globalForDb = globalThis as {
    mysqlPool?: mysql.Pool;
};

const pool =
    globalForDb.mysqlPool ??
    mysql.createPool({
        uri: dbUrl,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
    });

if (process.env.NODE_ENV !== "production") {
    globalForDb.mysqlPool = pool;
}

// Test kết nối (chỉ chạy 1 lần khi dev)
async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("🟢 [DATABASE] Kết nối MySQL thành công!");

        connection.release();
    } catch (error) {
        console.error("🔴 [DATABASE] Kết nối MySQL thất bại!");
        console.error(error);
    }
}

if (process.env.NODE_ENV === "development") {
    testConnection();
}

export const db = drizzle(pool, {
    schema,
    mode: "default",
});