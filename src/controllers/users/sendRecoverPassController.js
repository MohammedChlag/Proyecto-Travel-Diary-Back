import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { editRecoveryPassCodeService } from "../../services/users/editRecoveryPassCodeService.js";
import generateErrorUtils from "../../utils/helpers.js";

export const sendRecoverPassController = async (req, res, next) => {
  try {
    // Recuperar el email del body
    const { email } = req.body;

    // Buscar el usuario por email
    const user = await selectUserByEmailModel(email);
    if (!user) {
      throw generateErrorUtils(
        404,
        "NO_USER_FOUND",
        "No se ha encontrado el usuario"
      );
    }

    // Guardar el recoveryPassCode en el usuario
    const recoveryPassCode = await editRecoveryPassCodeService(user.id, email);

    res.status(200).send({
      status: "ok",
      message: "El código de recuperación se ha enviado correctamente",
      data: { recoveryPassCode },
    });
  } catch (error) {
    next(error);
  }
};
