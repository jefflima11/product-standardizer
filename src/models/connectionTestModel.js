import { getConnection } from "../config/db.js";

export async function testsConnection() {
    const conn = getConnection();

    try {
        const r = await conn.execute('select sysdate from dual');
        return r.rows;
    } finally {
       return conn.close();
    };
};
