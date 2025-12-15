import { getConnection} from "../config/db.js";
import { getAllProducts as getAllProductsQuery, dumpAllProducts as dumpAllProductsQuery, bodyQueryProducts, updateProducts as updateProductsQuery } from "../sql/productSql.js";
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
        const query_complete ='INSERT INTO DBAHUMS.PADRONIZA_PRODUTOS_HUMS' + dumpAllProductsQuery + bodyQueryProducts;
        await con.execute(query_complete,{}, { autoCommit: true });
    } catch(error) {
        console.error("Erro ao inserir dados na tabela de dump:", error.message);
    }
};

export async function updateProducts(products) {
  const con = await getConnection();

  try {
    for (const p of products) {
      const campos = [];
      const binds = { produto: p.produto };

      if (p.bloqueio !== undefined) {
        campos.push("SN_BLOQUEIO_DE_COMPRA = :bloqueio");
        binds.bloqueio = p.bloqueio;
      }

      if (p.padronizado !== undefined) {
        campos.push("SN_PADRONIZADO = :padronizado");
        binds.padronizado = p.padronizado;
      }

      if (p.controlado !== undefined) {
        campos.push("SN_CONTROLADO = :controlado");
        binds.controlado = p.controlado;
      }

      if (p.observacao !== undefined) {
        campos.push("DS_OBSERVACAO = :observacao");
        binds.observacao = p.observacao;
      }

      const sql = `
        UPDATE DBAHUMS.PADRONIZA_PRODUTOS_HUMS
        SET
          ${campos.join(", ")},
          DT_ALTERACAO = SYSDATE,
          CD_USUARIO = USER
        WHERE
          CD_PRODUTO = :produto
      `;

      await con.execute(sql, binds);
    }

    await con.commit();

    return { success: true };

  } finally {
    await con.close();
  }
};