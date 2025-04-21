import { getPool } from "../../config/db/getPool.js";

export const insertUserModel = async (user) => {
  // Conectar con la base de datos
  const pool = await getPool();

  const { id, username, email, password, registrationCode } = user;

  // Al hacer un insert, el resultado es un array en el que la primera posición es un objeto con información sobre la inserción
  const [result] = await pool.query(
    `INSERT INTO users (id, username, email, password, registrationCode) VALUES (?, ?, ?, ?, ?);`,
    [id, username, email, password, registrationCode]
  );

  return result;
};
