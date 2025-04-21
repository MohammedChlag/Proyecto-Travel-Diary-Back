import { getPool } from "../../config/db/getPool.js";

export const deletePhotoByIdModel = async (idList) => {
  // Obtener la conexión con la base de datos
  const pool = await getPool();

  // Ejecutar la consulta
  const [result] = await pool.query(
    `
    DELETE FROM photos
    WHERE id IN (?)
  `,
    [idList]
  );

  // Devolver el resultado
  return result;
};
