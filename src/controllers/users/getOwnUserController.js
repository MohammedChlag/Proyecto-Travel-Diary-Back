import { getOwnUserService } from "../../services/users/getOwnUserService.js";
import generateErrorUtils from "../../utils/helpers.js";

export const getOwnUserController = async (req, res, next) => {
  try {
    // Recoger el id del usuario de la request si no hay lanzamos error
    const { id } = req.user;
    if (!id) {
      throw generateErrorUtils(
        401,
        "USER_NOT_AUTHORIZED",
        "El usuario no está autorizado"
      );
    }

    // Buscar el usuario en la base de datos
    console.log("ID:", id);
    const user = await getOwnUserService(id);

    // Devolver el usuario
    res.status(200).json({
      status: "ok",
      message: "Usuario encontrado",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
