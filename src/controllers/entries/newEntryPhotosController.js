import { newPhotosService } from "../../services/photos/newPhotosService.js";
import generateErrorUtils from "../../utils/helpers.js";

export const newEntryPhotosController = async (req, res, next) => {
  try {
    // Obtener la entrada de req.entry
    const entry = req.entry;

    // Obtener las fotos de req.files
    if (!req.files) {
      throw generateErrorUtils(400, "DATA_MISSING", "No se han enviado fotos");
    }
    const photos = Object.values(req.files);

    // Comprobar si se pueden añadir las fotos ya que el usuario no puede tener más de 3 fotos por entrada
    if (entry.photos.length + photos.length > 3) {
      throw generateErrorUtils(
        400,
        "LIMIT_EXCEEDED",
        "No puede haber más de 3 fotos por entrada"
      );
    }

    // Añadir las fotos a la entrada
    const photosResults = await newPhotosService(
      entry.userId,
      entry.id,
      photos
    );

    // Responder al cliente
    res.status(201).send({
      succes: true,
      message: "Fotos añadidas",
      data: {
        entry: {
          ...entry,
          photos: [...entry.photos, ...photosResults],
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
