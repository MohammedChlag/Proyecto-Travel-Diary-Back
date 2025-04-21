import { getPool } from "../../config/db/getPool.js";

export const selectVotesByUserIdEntryIdModel = async (userId, entryId) => {
  // Conectar a la base de datos
  const pool = await getPool();

  // Realizar la consulta
  const [vote] = await pool.query(
    "SELECT value FROM usersEntriesVotes WHERE userId = ? AND entryId = ?",
    [userId, entryId]
  );

  // Devolver el resultado
  return vote[0];
};
