import { getEntryByIdService } from "../services/entries/getEntryByIdService.js";

export const entryExistsMiddleware = async (req, res, next) => {
  try {
    // Obtener el id de la entrada de los params
    const { id } = req.params;
    // Obtener la entrada de la base de datos.
    const entry = await getEntryByIdService(id);

    // Adjuntar la entrada al objeto req
    req.entry = entry;

    next();
  } catch (error) {
    next(error);
  }
};
