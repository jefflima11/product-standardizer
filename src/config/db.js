import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export async function iniDB() {
    try {
        oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR });

        pool = await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONNECTION_STRING,
            poolMin: 1,
            poolMax: 10,
            poolIncrement: 2,
            queueTimeout: 10000,
        });
        console.log('Pool de conexões Oracle criado com sucesso.');
    }   catch (err) {
        console.error('Erro ao criar pool de conexões Oracle:', err);
        process.exit(1);
    }
}

export async function closeDB() {
    try {
        if (pool) {
            await pool.close(0);
            console.log("Pool Oracle fechado");
        }
    } catch (err) {
        console.error('Error closing database connection pool:', err);
    }
}

export async function getConnection() {
    if (!pool) {
        throw new Error ("Pool não inicializado. Chame iniDB() antes de obter uma conexão.");
    }
    return await pool.getConnection();
};