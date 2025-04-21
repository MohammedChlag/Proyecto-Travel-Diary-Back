import { selectAllusersModel } from "../../models/users/selectAllusersModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const getAllUsersService = async () => {
  // Buscamos en la base de datos
  const users = await selectAllusersModel();

  // si no hay usuarios lanzamos un error
  if (!users.length) {
    throw generateErrorUtils(
      404,
      "NO_USERS_FOUND",
      "No se han encontrado usuarios"
    );
  }

  return users;
};
