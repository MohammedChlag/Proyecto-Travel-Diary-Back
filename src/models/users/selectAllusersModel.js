import { getPool } from "../../config/db/getPool.js";

export const selectAllusersModel = async () => {
  // Obtener la conexion con la base de datos
  const pool = await getPool();

  // Realizar la consulta para obtener todos los usuarios
  const [users] = await pool.query(
    "SELECT id, username, firstName, lastName, email, avatar, createdAt, updatedAt FROM users"
  );

  // Devolver los usuarios
  return users;
};
