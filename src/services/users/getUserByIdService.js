import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const getUserByIdService = async (id) => {
  // Obtener el usuario por su id. Si no existe, devolver un error
  const user = await selectUserByIdModel(id);
  if (!user) {
    throw generateErrorUtils(
      404,
      "USER_NOT_FOUND",
      "Usuario no encontrado o inactivo"
    );
  }

  // Devolver el usuario
  return user;
};
