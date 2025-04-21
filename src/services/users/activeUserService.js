import { selectUserByRegistrationCodeModel } from "../../models/users/selectUserByRegistrationCodeModel.js";
import { updateActiveUserModel } from "../../models/users/updateActiveUserModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const activeUserService = async (registrationCode) => {
  // Buscar si el usuario ya existe por registrationCode
  const user = await selectUserByRegistrationCodeModel(registrationCode);
  if (!user) {
    throw generateErrorUtils(400, "USER_NOT_FOUND", "El usuario no existe");
  }

  // Comprobar si el usuario ya está activo. Si ya está activo, lanzar un error
  if (user.active === 1) {
    throw generateErrorUtils(
      400,
      "USER_ALREADY_ACTIVE",
      "El usuario ya está activo"
    );
  }

  // Activar el usuario
  const result = await updateActiveUserModel(registrationCode);
  if (result.affectedRows !== 1) {
    throw generateErrorUtils(500, "ERROR_DB", "No se pudo activar el usuario");
  }

  // Devolver el usuario activado
  return { ...user, active: 1 };
};
