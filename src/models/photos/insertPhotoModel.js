import { getPool } from "../../config/db/getPool.js";

export const insertPhotoModel = async (photoId, entryId, photoName) => {
  // Crear la conexión a la base de datos
  const pool = await getPool();
  const [result] = await pool.query(
    `
        INSERT INTO photos (id, name, entryId)
        VALUES (?, ?, ?)
    `,
    [photoId, photoName, entryId]
  );

  return result;
};
