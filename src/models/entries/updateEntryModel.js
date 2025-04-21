import { getPool } from "../../config/db/getPool.js";

export const updateEntryModel = async (entry) => {
  // Obtener la conexión con la base de datos
  const pool = await getPool();

  // Realizar la consulta
  const [result] = await pool.query(
    `UPDATE entries SET title = ?, place = ?, description = ? WHERE id = ?`,
    [entry.title, entry.place, entry.description, entry.id]
  );

  // Devolver el resultado
  return result;
};
