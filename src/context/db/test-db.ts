import { pool } from "../db/postgres.db";


export const testDB = async () => {
  try {
    await pool.query('SELECT 1'); // Esta consulta no devuelve nada, solo prueba la conexión
    console.log("✅ Conexión a PostgreSQL exitosa✅");
  } catch (err) {
    console.error("❌ Error conectando a la base de datos:", err);
    process.exit(1); // Detener ejecución si falla la conexión
  }
};
