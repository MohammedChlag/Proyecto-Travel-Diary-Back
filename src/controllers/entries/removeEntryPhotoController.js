import { deletePhotoByIdModel } from "../../models/photos/deletePhotoByIdModel.js";

export const removeEntryPhotosController = async (req, res, next) => {
  try {
    // Obtener id de la imagen a eliminar de los params
    const { photoId } = req.params;

    // Eliminamos la imagen
    await deletePhotoByIdModel(photoId);

    // Respondemos al cliente
    res.status(200).send({
      success: true,
      status: "ok",
      message: "Imagen eliminada con éxito",
    });
  } catch (error) {
    next(error);
  }
};
