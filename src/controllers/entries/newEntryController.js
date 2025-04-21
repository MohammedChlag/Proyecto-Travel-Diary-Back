import { newEntryService } from "../../services/entries/newEntryService.js";
import { newPhotosService } from "../../services/photos/newPhotosService.js";
import generateErrorUtils from "../../utils/helpers.js";

export const newEntryController = async (req, res, next) => {
  try {
    // Obtener el id del usuario
    // const { id } = req.user;
    const userId = req.user.id;

    // Obtener la info del body
    const { title, place, description } = req.body;

    // Obtener las fotos del body
    // const photos = req.files; // Si lo hago así estoy guardando un objeto con las fotos
    let photos = [];
    if (req.files) {
      photos = Object.values(req.files);
    }
    // const photos = Object.values(req.files); // Si lo hago así estoy guardando un array con las fotos

    // Permitimos 3 fotos como máximo
    if (photos.length > 3) {
      throw generateErrorUtils(
        400,
        "PHOTOS_LIMIT",
        "No puedes subir más de 3 fotos"
      );
    }
    // Crear una entrada en la base de datos
    const entry = await newEntryService({
      userId,
      title,
      place,
      description,
    });

    // Crear las fotos en la base de datos solo si hay fotos
    let photosResult = [];

    if (photos.length > 0) {
      photosResult = await newPhotosService(userId, entry.id, photos);
      if (photosResult.affectedRows === 0) {
        throw generateErrorUtils(
          500,
          "PHOTOS_NOT_CREATED",
          "No se han podido crear las fotos"
        );
      }
    }

    // Responder con la entrada y las fotos creadas
    res.status(201).send({
      status: "ok",
      data: {
        ...entry,
        photos: photosResult,
      },
    });
    // res.status(201).send('Listo');
  } catch (error) {
    next(error);
  }
};
