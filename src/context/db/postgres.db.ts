import { Pool } from "pg"; //npm i pg
import dotenv from "dotenv"; //npm i dotenv
dotenv.config();

const dbHost = process.env.POSTGRES_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;

export const pool = new Pool({
  max: 1000,
  connectionString: `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`,
  idleTimeoutMillis: 30000,
});

export const executeQuery = async (sql: string, data?: any[]) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(sql, data);
    return rows;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  } finally {
    client.release(); 
  }
};


