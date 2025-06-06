import { activeUserService } from "../../services/users/activeUserService.js";
import generateErrorUtils from "../../utils/helpers.js";

export const activeUserController = async (req, res, next) => {
  try {
    // Recoger el código de registro de la URL
    const { registrationCode } = req.params;

    // Comprobar si hay código de registro
    if (!registrationCode) {
      throw generateErrorUtils(
        400,
        "REGISTRATION_CODE_MISSING",
        "El código de registro es obligatorio"
      );
    }

    // Llamar al service que activa al usuario
    const user = await activeUserService(registrationCode);

    // Enviar respuesta
    res.status(200).send({
      status: "ok",
      message: "Usuario Activado Correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
