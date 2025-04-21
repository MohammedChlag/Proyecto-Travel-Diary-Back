import { getPool } from "../../config/db/getPool.js";

export const updatePasswordByRecoveryModel = async (id, password) => {
  // Obtener la conexión
  const pool = await getPool();

  // Realizar la consulta
  const [result] = await pool.query(
    `UPDATE users SET password = ?, recoveryPassCode = NULL WHERE id = ?`,
    [password, id]
  );

  // Devolver el resultado
  return result;
};
