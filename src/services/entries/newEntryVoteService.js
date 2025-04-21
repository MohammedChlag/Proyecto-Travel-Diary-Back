import crypto from "crypto";

import { selectEntryByIdModel } from "../../models/entries/selectEntryByIdModel.js";
import { selectVotesByUserIdEntryIdModel } from "../../models/entries/selectVotesByUserIdEntryIdModel.js";
import { insertVoteModel } from "../../models/entries/insertVoteModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const newEntryVoteService = async (userId, entryId, value) => {
  // Comprobar si el usuario ya ha votado
  const vote = await selectVotesByUserIdEntryIdModel(userId, entryId);
  // Si hay voto lanzar un error
  if (vote) {
    throw generateErrorUtils(403, "FORBIDDEN", "Ya has votado esta entrada");
  }

  // Crear un nuevo voto
  const id = crypto.randomUUID();
  await insertVoteModel(id, userId, entryId, value);

  // Obtener la entrada actualizada
  const entry = await selectEntryByIdModel(entryId);

  // Devolver la entrada actualizada
  return entry;
};
