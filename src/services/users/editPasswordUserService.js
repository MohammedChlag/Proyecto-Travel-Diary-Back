import bcrypt from "bcrypt";

import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { updatePasswordModel } from "../../models/users/updatePasswordModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const editPasswordUserService = async (
  id,
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  // Buscar el usuario en la base de datos por id
  const user = await selectUserByIdModel(id);

  // Verificar que la contraseña actual sea correcta. Si no lo es, devolver un error
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw generateErrorUtils(
      400,
      "WRONG_PASSWORD",
      "La contraseña actual es incorrecta"
    );
  }

  // Comprobar que la nueva contraseña y la confirmación de la nueva contraseña sean iguales. Si no lo son, devolver un error
  if (newPassword !== confirmNewPassword) {
    throw generateErrorUtils(
      400,
      "PASSWORDS_DO_NOT_MATCH",
      "Las contraseñas no coinciden"
    );
  }

  // Encriptar la nueva contraseña
  const newpasswordHash = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña en la base de datos
  const result = await updatePasswordModel(id, newpasswordHash);
  if (result.affectedRows !== 1) {
    throw generateErrorUtils(
      500,
      "ERROR_UPDATING_PASSWORD",
      "Error al actualizar la contraseña"
    );
  }

  // Eliminar el password del usuario
  delete user.password;

  // Devolver el usuario actualizado
  return user;
};
