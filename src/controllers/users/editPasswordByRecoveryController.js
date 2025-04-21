import { editPasswordBYRecoveryService } from "../../services/users/editPasswordBYRecoveryService.js";

export const editPasswordByRecoveryController = async (req, res, next) => {
  try {
    // Recuperar el email, el recoveryPassCode, la nueva contraseña y la confirmación de la nueva contraseña del body
    const { email, recoveryPassCode, newPassword, newPasswordConfirm } =
      req.body;

    // Buscar el usuario por email.
    await editPasswordBYRecoveryService(
      email,
      recoveryPassCode,
      newPassword,
      newPasswordConfirm
    );

    // Responder al cliente
    res.status(200).send({
      status: "ok",
      message: "La contraseña se ha actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
};
