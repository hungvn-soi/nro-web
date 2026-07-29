import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const dbUrl =
    process.env.DATABASE_URL ??
    "mysql://root:@localhost:3306/nro_game";

// Pool kết nối
const pool = mysql.createPool(dbUrl);

// Test kết nối
async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("🟢 [DATABASE] Kết nối MySQL thành công!");

        connection.release();
    } catch (error) {
        console.error("🔴 [DATABASE] Kết nối thất bại!");
        console.error(error);
    }
}

testConnection();

export const db = drizzle(pool, {
    schema,
    mode: "default",
});