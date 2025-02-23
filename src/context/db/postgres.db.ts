import { Pool } from "pg"; //npm i pg
import dotenv from "dotenv"; //npm i dotenv
import fs from "fs"; 
dotenv.config();

const dbHost = process.env.POSTGRES_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;
const sslEnabled = process.env.POSTGRES_SSL === 'true';

export const pool = new Pool({
  max: 1000,
  connectionString: `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`,
  idleTimeoutMillis: 30000,
  ssl: sslEnabled ? {
    rejectUnauthorized: false,  // Este valor se puede poner en true si se quiere una validación más estricta
    ca: fs.readFileSync('/path/to/ca-cert.pem').toString(),  // Si usas un certificado raíz
    key: fs.readFileSync('/path/to/client-key.pem').toString(),  // Si tienes una clave cliente
    cert: fs.readFileSync('/path/to/client-cert.pem').toString() // Si tienes un certificado cliente
  } : false,
});


pool.connect()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa ✅"))
  .catch(err => {
    console.error("❌ Error conectando a la base de datos:", err);
    process.exit(1);
  });

export const executeQuery = async (sql: string, data?: any[]) => {
  console.log("⏳ Ejecutando consulta SQL:");
  console.log("📜 Query:", sql);
  console.log("📌 Valores:", data);

  const client = await pool.connect();
  try {
    const { rows } = await client.query(sql, data);
    console.log("✅ Resultado de la consulta:", rows);
    return rows;
  } catch (err) {
    console.error("❌ Error en la consulta SQL:", err);
    throw err;
  } finally {
    client.release();
  }
};

