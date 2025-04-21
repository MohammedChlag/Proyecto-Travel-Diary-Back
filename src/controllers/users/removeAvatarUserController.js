import { removeAvatarUserService } from "../../services/users/removeAvatarUserService.js";

export const removeAvatarUserController = async (req, res, next) => {
  try {
    // Recoger el id del usuario de la request
    const { id } = req.user;

    // Llamar al service para borrar el avatar
    const user = await removeAvatarUserService(id);

    // responder al cliente
    res.status(201).send({
      status: "ok",
      message: "Avatar eliminado",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
