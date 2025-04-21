import { getPool } from "../../config/db/getPool.js";

export const selectUserByIdModel = async (id) => {
  const pool = await getPool();

  // Obtener el usuario por ID si está activo
  const [user] = await pool.query(
    `SELECT * FROM users WHERE id = ? AND active = 1`,
    [id]
  );

  if (!user[0]) return null; // Si no existe, devolver null

  // Obtener las entradas del usuario con votos promedio y conteo
  const [entries] = await pool.query(
    `
    SELECT 
      E.*, 
      U.username, 
      U.avatar, 
      ROUND(IFNULL(AVG(UEV.value), 0), 2) AS averageVote, 
      IFNULL(COUNT(UEV.id), 0) AS votesCount
    FROM entries E
    LEFT JOIN usersEntriesVotes UEV ON E.id = UEV.entryId
    LEFT JOIN users U ON E.userId = U.id
    WHERE E.userId = ?
    GROUP BY E.id
    ORDER BY E.createdAt DESC
    `,
    [user[0].id]
  );

  // Si no hay entradas, devolver directamente al usuario sin fotos
  if (entries.length === 0) {
    return { ...user[0], entries: [] };
  }

  // Obtener fotos asociadas a las entradas en una sola consulta
  const [photos] = await pool.query(
    `SELECT * FROM photos WHERE entryId IN (?)`,
    [entries.map((entry) => entry.id)]
  );

  // Mapear fotos a sus respectivas entradas
  const entriesWithPhotos = entries.map((entry) => {
    const entryPhotos = photos.filter((photo) => photo.entryId === entry.id);
    return { ...entry, photos: entryPhotos };
  });

  return { ...user[0], entries: entriesWithPhotos };
};
