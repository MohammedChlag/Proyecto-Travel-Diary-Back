import { removeEntryService } from "../../services/entries/removeEntryService.js";

export const removeEntryController = async (req, res, next) => {
  try {
    // Obtener la id de la entry a borrar
    const entry = req.entry;

    // Borrar la entry
    await removeEntryService(entry);

    // Responder al cliente
    res.status(200).send({
      succes: true,
      status: "ok",
      message: "Entrada eliminada",
    });
  } catch (error) {
    next(error);
  }
};
