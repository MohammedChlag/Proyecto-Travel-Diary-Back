import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const getOwnUserService = async (id) => {
  // Comprobar si el usuario existe
  const user = await selectUserByIdModel(id);

  // Si no existe, lanzar un error. Si se llego a este punto, el usuario existe porque está logueado
  if (!user) {
    throw generateErrorUtils(404, "USER_NOT_FOUND", "El usuario no existe");
  }

  // Eliminar el password del usuario
  delete user.password;

  return user;
};
