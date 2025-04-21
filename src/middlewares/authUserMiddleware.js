import { SECRET } from "../config/env.js";
import generateErrorUtils from "../utils/helpers.js";
import {
  checkExtractTokenUtils,
  verifyTokenPayloadUtils,
} from "../utils/tokenUtils.js";

export const authUserMiddleware = async (req, res, next) => {
  try {
    // Recoger el token del header
    const { authorization } = req.headers;

    // Comprobar si hay token
    if (!authorization) {
      throw generateErrorUtils(
        401,
        "TOKEN_MISSING",
        "Falta el token en los headers"
      );
    }

    // Verificar y extraer el token
    const token = checkExtractTokenUtils(authorization);

    // Extraer el payload
    const payload = verifyTokenPayloadUtils(token, SECRET);

    // Guardar el payload en req. con esto añadimos la info del usuario(id y role) a la request
    req.user = payload;

    // Pasamos al siguiente middleware
    next();
  } catch (error) {
    next(error);
  }
};
