import { getPool } from "../../config/db/getPool.js";

export const selectPhotosByEntryIdModel = async (entryId) => {
  // Obtener la conexion con la base de datos
  const pool = await getPool();

  // Realizar la consulta para obtener todas las fotos de una entrada
  const [photos] = await pool.query(`SELECT * FROM photos WHERE entryId = ?`, [
    entryId,
  ]);

  // 3. Devolver las fotos
  return photos;
};
