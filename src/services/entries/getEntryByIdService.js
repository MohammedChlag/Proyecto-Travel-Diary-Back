import { selectEntryByIdModel } from "../../models/entries/selectEntryByIdModel.js";
import { selectPhotosByEntryIdModel } from "../../models/photos/selectPhotosByEntryIdModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const getEntryByIdService = async (id) => {
  // Obtener la entrada de la base de datos.
  const entry = await selectEntryByIdModel(id);
  // Si no existe, devolver un error
  if (!entry) {
    throw generateErrorUtils(
      404,
      "ENTRY_NOT_FOUND",
      "No se ha encontrado la entrada"
    );
  }

  // Obtener las fotos de la entrada
  const photos = await selectPhotosByEntryIdModel(entry.id);
  entry.photos = photos;

  // 3. Devolver la entrada
  return entry;
};
