import { getPool } from "../../config/db/getPool.js";

export const updateRecoveryPassCodeModel = async (id, recoveryPassCode) => {
  // Obtener la conexión a la base de datos
  const pool = await getPool();

  // Actualizar el recoveryPassCode en el usuario
  const [result] = await pool.query(
    `
    UPDATE users
    SET recoveryPassCode = ?
    WHERE id = ?
  `,
    [recoveryPassCode, id]
  );

  // Devolver el resultado
  return result;
};
