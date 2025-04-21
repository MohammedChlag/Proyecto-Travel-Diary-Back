import { getPool } from "../../config/db/getPool.js";

export const selectEntryByIdModel = async (id) => {
  // Obtener la conexión con la base de datos
  const pool = await getPool();

  // 2. Realizar la consulta
  const [entry] = await pool.query(
    `SELECT E.*, 
      ROUND(IFNULL(AVG(UEV.value), 0), 2) AS averageVote, 
      IFNULL(COUNT(UEV.id), 0) AS votesCount
		FROM entries E
		LEFT JOIN usersEntriesVotes UEV ON UEV.entryId = E.id
		WHERE E.id = ?
		GROUP BY E.id`,
    [id]
  );

  // 3. Devolver el resultado
  return entry[0];
};
