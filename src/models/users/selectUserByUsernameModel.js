import { getPool } from "../../config/db/getPool.js";

export const selectUserByUsernameModel = async (username) => {
  // Conectar con la base de datos
  const pool = await getPool();
  // Al hacer un select, el resultado es un array con 2 posiciones
  // La primera son los resultados. Es un array con tantas posiciones como registros haya encontrado.
  // La segunda es un array con información sobre la tabla
  const [user] = await pool.query(`SELECT * FROM users WHERE username = ?;`, [
    username,
  ]);

  // Como username es único, solo habrá un registro por lo que nos quedamos con la primera posición
  return user[0];
};
