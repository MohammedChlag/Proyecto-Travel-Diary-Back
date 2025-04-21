import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET } from "../../config/env.js";
import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import generateErrorUtils from "../../utils/helpers.js";

export const loginUserService = async (email, password) => {
  // Buscar si el usuario ya existe por email
  const user = await selectUserByEmailModel(email);

  // Comprobar si la contraseña es correcta
  let isValidPassword = false;
  if (user) {
    isValidPassword = await bcrypt.compare(password, user.password);
  }

  if (!user || !isValidPassword) {
    throw generateErrorUtils(
      400,
      "USER_NOT_FOUND",
      "El usuario o la contraseña no son correctos"
    );
  }

  // Comprobar si el usuario está activo
  if (!user.active) {
    throw generateErrorUtils(
      400,
      "USER_NOT_ACTIVE",
      "El usuario no está activo. Revisa tu email"
    );
  }

  // Generar token
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, SECRET, {
    expiresIn: "1h",
  });

  return token;
};
