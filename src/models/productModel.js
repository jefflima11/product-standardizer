import { getConnection} from "../config/db.js";
import oracledb from 'oracledb';

export async function getAllProducts() {
    const conn = await getConnection();

    try {
        const r = await conn.execute(`
            SELECT  P.CD_PRODUTO as codigo_produto,
                    P.DS_PRODUTO as descricao_produto,
                    F.DT as data_ultima_movimentacao,
                    (TRUNC(SYSDATE) - TRUNC(TO_TIMESTAMP(F.DT)))  as dia,
                    DECODE(P.SN_PADRONIZADO, 'S', 'SIM', 'N', 'NAO') as padronizado,
                    DECODE(P.SN_BLOQUEIO_DE_COMPRA, 'S', 'SIM', 'N', 'NAO') as bloqueio_de_compra,
                    DECODE(P.SN_PSCOTROPICO, 'S', 'SIM', 'N', 'NAO') as psicotropico,
                    ES.DS_ESPECIE as descricao_especie,
                    TP_MVTO_ESTOQUE as tipo_ultima_movimentacao,
                    DS_CLASSE as descricao_classe,
                    DS_SUB_CLA as descricao_sub_classe
            FROM   (SELECT  DISTINCT
                            P.CD_PRODUTO,
                            MAX(IME.CD_MVTO_ESTOQUE)CD_MVTO_ESTOQUE,
                            Max(IME.DH_MVTO_ESTOQUE)DT,
                            C.DS_CLASSE,
                            S.DS_SUB_CLA
                    FROM    DBAMV.MVTO_ESTOQUE ME,
                            DBAMV.ITMVTO_ESTOQUE IME,
                            DBAMV.PRODUTO P,
                            DBAMV.CLASSE C,
                            DBAMV.SUB_CLAS S

                    WHERE ME.CD_MVTO_ESTOQUE = IME.CD_MVTO_ESTOQUE
                    AND   IME.CD_PRODUTO = P.CD_PRODUTO
                    AND   P.CD_ESPECIE IN (:especie)
                    AND   P.CD_ESPECIE = C.CD_ESPECIE
                    AND   P.CD_CLASSE = C.CD_CLASSE
                    AND   P.CD_CLASSE = S.CD_CLASSE
                    AND   P.CD_ESPECIE = S.CD_ESPECIE
                    AND   P.CD_SUB_CLA = S.CD_SUB_CLA
                    AND   P.SN_MOVIMENTACAO = 'S'
                    AND   ME.TP_MVTO_ESTOQUE IN ('P','S')
                    AND   C.CD_CLASSE IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27)
            GROUP
                    BY   P.CD_PRODUTO, C.DS_CLASSE, S.DS_SUB_CLA
            ORDER
                BY   P.CD_PRODUTO)F,
                    DBAMV.PRODUTO P,
                    DBAMV.MVTO_ESTOQUE ME,
                    DBAMV.ESTOQUE E,
                    DBAMV.EST_PRO EP,
                    DBAMV.ESPECIE ES
            WHERE   F.CD_PRODUTO = P.CD_PRODUTO
            AND   F.CD_MVTO_ESTOQUE = ME.CD_MVTO_ESTOQUE
            AND   ME.CD_ESTOQUE = E.CD_ESTOQUE
            AND   E.CD_ESTOQUE = EP.CD_ESTOQUE
            AND   P.CD_PRODUTO = EP.CD_PRODUTO
            AND   P.CD_ESPECIE = ES.CD_ESPECIE
            AND   P.SN_MESTRE = 'N'
            AND   P.SN_MOVIMENTACAO = 'S'
            ORDER BY 3,1
        `,{ 
            especie: 1
        }, { 
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        return r.rows;
    } finally {
        await conn.close();
    };
};