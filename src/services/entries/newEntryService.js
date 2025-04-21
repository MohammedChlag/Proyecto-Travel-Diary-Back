import crypto from "crypto";

import { insertEntryModel } from "../../models/entries/insertEntryModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const newEntryService = async (entry) => {
  // Crear la id de la entrada con crypto.randomUUID()
  const id = crypto.randomUUID();

  // Crear una entrada en la base de datos
  const result = await insertEntryModel({
    id,
    ...entry,
  });

  if (result.affectedRows !== 1) {
    throw generateErrorUtils(
      500,
      "ENTRY_NOT_CREATED",
      "No se ha podido crear la entrada"
    );
  }

  // Devolver la entrada creada
  return {
    id,
    ...entry,
  };
};
