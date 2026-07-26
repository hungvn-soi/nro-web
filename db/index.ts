import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const dbUrl = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/nro_game';

// 1. Tạo Pool kết nối
const poolConnection = mysql.createPool(dbUrl);

// 2. Hàm tự động test kết nối và in Log
async function testConnection() {
    try {
        const connection = await poolConnection.getConnection();
        console.log('🟢 [DATABASE] Kết nối MySQL Database thành công!');
        connection.release(); // Trả lại connection cho pool
    } catch (error: any) {
        console.error('🔴 [DATABASE] Kết nối Database THẤT BẠI!');
        console.error('❌ Chi tiết lỗi:', error.message);
    }
}

// Chạy test ngay khi file được import lần đầu
testConnection();

// 3. Export instance Drizzle
export const db = drizzle(poolConnection, { schema, mode: 'default' });