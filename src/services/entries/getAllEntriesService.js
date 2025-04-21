import { selectAllEntriesModel } from "../../models/entries/selectAllEntriesModel.js";
import { selectPhotosByEntryIdModel } from "../../models/photos/selectPhotosByEntryIdModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const getAllEntriesService = async () => {
  // Obtener todas las entradas de la base de datos
  const entries = await selectAllEntriesModel();

  // Obtener las fotos de cada entrada
  for (const entry of entries) {
    const photos = await selectPhotosByEntryIdModel(entry.id);
    entry.photos = photos;
  }

  // throw si no hay entradas
  if (!entries.length) {
    throw generateErrorUtils(
      404,
      "NO_ENTRIES_FOUND",
      "No se han encontrado entradas"
    );
  }

  // Devolver las entradas
  return entries;
};
