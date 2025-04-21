import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { selectUserByUsernameModel } from "../../models/users/selectUserByUsernameModel.js";
import { updateUserModel } from "../../models/users/updateUserModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const editUserService = async (id, newUserInfo) => {
  // Crear un objeto limpio que evita posibles undefined
  const cleanUserInfo = {
    username: newUserInfo.username ?? null,
    firstName: newUserInfo.firstName ?? null,
    lastName: newUserInfo.lastName ?? null,
    email: newUserInfo.email ?? null,
  };

  // Verificar si alguien tiene ese username y no sea yo
  const sameUsername = await selectUserByUsernameModel(cleanUserInfo.username);
  if (sameUsername && sameUsername.id !== id) {
    throw generateErrorUtils(
      400,
      "USERNAME_ALREADY_EXISTS",
      "El nombre de usuario ya existe"
    );
  }

  // Verificar si alguien tiene ese email y no sea yo
  const sameEmail = await selectUserByEmailModel(cleanUserInfo.email);
  if (sameEmail && sameEmail.id !== id) {
    throw generateErrorUtils(400, "EMAIL_ALREADY_EXISTS", "El email ya existe");
  }

  // Actualizar los datos
  const result = await updateUserModel(id, cleanUserInfo);

  if (result.affectedRows === 0) {
    throw generateErrorUtils(
      500,
      "USER_NOT_UPDATED",
      "El usuario no se ha actualizado"
    );
  }

  // Devolver los datos del usuario actualizados
  return { id, ...cleanUserInfo };
};
