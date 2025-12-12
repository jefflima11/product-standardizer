import { getConnection} from "../config/db.js";
import { getAllProducts as getAllProductsQuery, dumpAllProducts as dumpAllProductsQuery, bodyQueryProducts } from "../sql/productSql.js";
import oracledb from 'oracledb';

export async function getAllProducts() {
    const conn = await getConnection();

    try {
        const query_complete = getAllProductsQuery + bodyQueryProducts;
        const r = await conn.execute(query_complete,{}, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        return r.rows;
    } finally {
        await conn.close();
    };
};

export async function dumpAllProducts() {
    const con = await getConnection();

    try {
        await con.execute(`
            DELETE FROM DBAHUMS.PADRONIZA_PRODUTOS_HUMS
        `,[], { autoCommit: true });
    } catch(error) {
        console.error("Erro ao limpar tabela de dump:", error.message);
    }

    try {
        const query_complete ='INSERT INTO DBAHUMS.PADRONIZA_PRODUTOS_HUMS' + dumpAllProductsQuery + bodyQueryProducts;
        await con.execute(query_complete,{}, { autoCommit: true });
    } catch(error) {
        console.error("Erro ao inserir dados na tabela de dump:", error.message);
    }
}