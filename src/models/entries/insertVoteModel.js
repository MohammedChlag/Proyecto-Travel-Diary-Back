import { getPool } from "../../config/db/getPool.js";

export const insertVoteModel = async (id, userId, entryId, value) => {
  // Conectar a la base de datos
  const pool = await getPool();

  // Insertar el voto
  const [result] = await pool.query(
    "INSERT INTO usersEntriesVotes (id, userId, entryId, value) VALUES (?, ?, ?, ?)",
    [id, userId, entryId, value]
  );

  // Devolver el resultado
  return result;
};
