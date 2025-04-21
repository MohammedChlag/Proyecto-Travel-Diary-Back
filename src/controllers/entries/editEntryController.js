import { editEntryService } from "../../services/entries/editEntryService.js";
import generateErrorUtils from "../../utils/helpers.js";

export const editEntryController = async (req, res, next) => {
  try {
    // Obtener la entry de req.entry
    const oldEntry = req.entry;

    // Obtener la info del body. Si no existe, devolver un error
    const newEntry = req.body;
    if (!newEntry) {
      throw generateErrorUtils(400, "DATA_MISSING", "No se han enviado datos");
    }

    const { title, place, description } = newEntry;
    if (!title || !place || !description) {
      throw generateErrorUtils(400, "MISSING_PARAMETERS", "Faltan parámetros");
    }

    // Editar la entrada
    const entry = await editEntryService({
      id: oldEntry.id,
      ...newEntry,
    });

    // Responder al cliente
    res.status(200).send({
      status: "Ok",
      message: "Entrada editada",
      data: {
        entry: { ...oldEntry, ...entry },
      },
    });
  } catch (error) {
    next(error);
  }
};
