import path from "path";
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { deletePhotoUtil, savePhotoUtil } from "../../utils/photoUtils.js";
import { updateAvatarUserModel } from "../../models/users/updateAvatarUserModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const editAvatarService = async (id, avatar) => {
  // Buscar al usuario en la base de datos por id
  const user = await selectUserByIdModel(id);

  const userRelativePath = `src/uploads/avatars/${id}`;
  // const avatarDir = path.join(process.cwd(), avatarRelativeDir);

  // Procesar y guardar la imagen en el directorio de subida
  const imageName = await savePhotoUtil(userRelativePath, avatar, 200);

  // Si el usuario ya tenía un avatar, borrarlo
  if (user.avatar) {
    const avatarPath = path.join(process.cwd(), userRelativePath, user.avatar);
    await deletePhotoUtil(avatarPath);
  }

  // Actualizar el avatar del usuario en la base de datos con una ruta relativa del archivo
  const result = await updateAvatarUserModel(id, imageName);
  if (result.affectedRows !== 1) {
    throw generateErrorUtils(
      500,
      "UPDATE_AVATAR_ERROR",
      "No se ha podido actualizar el avatar"
    );
  }

  // Eliminar el password del usuario
  delete user.password;

  return { ...user, avatar: imageName };
};
