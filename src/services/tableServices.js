import { getConnection } from "../config/db.js";

export async function verifica_tabelas() {
    const con = await getConnection();

    try {
        const seq = await con.execute(`
            Select
                sequence_name
            From
                All_Sequences
            Where
                sequence_name = 'SEQ_PADRONIZA_PRODUTOS'
        `);

        if (!seq || seq.rows.length === 0) {
            try {
                await con.execute(`
                    CREATE SEQUENCE  
                        DBAHUMS.seq_padroniza_produtos  MINVALUE 1 MAXVALUE 9999999999999999999999999999 
                    INCREMENT BY 1 START WITH 21 CACHE 20 NOORDER  NOCYCLE
                    `,[], { autoCommit: true });
    
                console.log("Sequencia 'seq_padroniza_produtos' criada com sucesso.");
            } catch(createError) {
                console.error("Erro ao criar sequencia':", createError);
            }

        }

    } catch(error) {
        if(error.code === 'ORA-02289') { 
        } else {
            console.error(error.message);
        }

    }

    try {
        const result = await con.execute(`
            select 
                1
            from
                dbahums.padroniza_produtos_hums
        `);

        if(!result) {
            console.log("Tabela 'PADRONIZA_PRODUTOS_HUMS' criada com sucesso.");
        }

    } catch(error) {
        if(error.code === 'ORA-00942') { 
            // tabela não existe
            try {
                await con.execute(`
                    CREATE TABLE DBAHUMS.PADRONIZA_PRODUTOS_HUMS (
                        CD_PADRONIZA_PRODUTOS INT PRIMARY KEY,
                        CD_PRODUTO INT NOT NULL,
                        SN_BLOQUEIO_DE_COMPRA VARCHAR2(1) NOT NULL,
                        SN_PADRONIZADO VARCHAR2(1) NOT NULL,
                        SN_CONTROLADO VARCHAR2(1) NOT NULL,
                        DT_ALTERACAO DATE NOT NULL,
                        DS_OBSERVACAO VARCHAR2(500),
                        CD_USUARIO VARCHAR(55) NOT NULL
                    )
                    `,[], { autoCommit: true });
                    console.log("Tabela 'PADRONIZA_PRODUTOS' criada com sucesso.");
            } catch(createError) {
                console.error("Erro ao criar tabela 'PADRONIZA_PRODUTOS_HUMS':", createError);
            }  
        }
    } 
}