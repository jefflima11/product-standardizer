import { getConnection } from "../config/db.js";

export async function connectionTest() {
    const conn = await getConnection();

    try {
        const r = await conn.execute('select sysdate from dual');
        return r.rows;
    } finally {
        await conn.close();
    };
};
