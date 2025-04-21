import { getPool } from "../../config/db/getPool.js";

export const insertEntryModel = async (entry) => {
  // Crear la conexión a la base de datos
  const pool = await getPool();

  // Crear una entrada en la base de datos
  const [result] = await pool.query(
    `INSERT INTO entries (id, title, place, description, userId )
    VALUES (?, ?, ?, ?, ?)`,
    [entry.id, entry.title, entry.place, entry.description, entry.userId]
  );

  // Devolver la entrada creada
  return result;
};
