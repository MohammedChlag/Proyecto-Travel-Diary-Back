import { getPool } from "../../config/db/getPool.js";

export const deleteEntryByIdModel = async (id) => {
  // Obtener la conexión con la base de datos
  const pool = await getPool();

  // Ejecutar la consulta
  const [result] = await pool.query(
    `
    DELETE FROM entries
    WHERE id = ?
  `,
    [id]
  );

  return result;
};
