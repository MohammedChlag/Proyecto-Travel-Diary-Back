import { getPool } from "../../config/db/getPool.js";

export const selectAllEntriesModel = async () => {
  // Obtener la conexion con la base de datos
  const pool = await getPool();

  // Realizar la consulta para obtener todas las entradas
  const [entries] = await pool.query(
    `SELECT E.*, U.username, 
    U.avatar, ROUND(IFNULL(AVG(UEV.value), 0), 2) AS averageVote, IFNULL(COUNT(UEV.id), 0) AS votesCount
    FROM entries E
    LEFT JOIN usersEntriesVotes UEV ON E.id = UEV.entryId
		LEFT JOIN users U ON E.userId = U.id
    GROUP BY E.id
		ORDER BY E.createdAt DESC`
  );

  // Devolver las entradas
  return entries;
};
