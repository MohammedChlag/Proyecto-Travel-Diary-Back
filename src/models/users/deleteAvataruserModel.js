import { getPool } from "../../config/db/getPool.js";

export const deleteAvataruserModel = async (id) => {
  // Conectar con la base de datos
  const pool = await getPool();

  // Al hacer un delete, el resultado es un array en el que la primera posición es un objeto con información sobre la eliminación
  const [result] = await pool.query(
    `UPDATE users SET avatar = NULL WHERE id = ?;`,
    [id]
  );

  return result;
};
