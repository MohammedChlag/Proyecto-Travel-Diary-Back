import { getPool } from "../../config/db/getPool.js";

export const updateUserModel = async (id, info) => {
  // Conectar con la base de datos
  const pool = await getPool();

  // Realizar la consulta
  const [result] = await pool.query(
    `UPDATE users SET username = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?`,
    [info.username, info.firstName, info.lastName, info.email, id]
  );

  // Devolver el resultado
  return result;
};
