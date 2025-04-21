import { getPool } from "../../config/db/getPool.js";

export const updatePasswordModel = async (id, password) => {
  // Conectar con la base de datos
  const pool = await getPool();

  // Realizar la consulta
  const [result] = await pool.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [password, id]
  );

  // Devolver el resultado
  return result;
};
