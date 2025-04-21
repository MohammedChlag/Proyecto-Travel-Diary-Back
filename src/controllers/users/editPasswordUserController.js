import validateSchemaUtil from "../../utils/ValidateSchema.js";
import { updatePasswordSchema } from "../../schemas/updatePasswordSchema.js";
import { editPasswordUserService } from "../../services/users/editPasswordUserService.js";

export const editPasswordUserController = async (req, res, next) => {
  try {
    // Obtener el id de req.user
    const { id } = req.user;

    // Obtener la info de req.body. Si no hay info, devolver un error
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    await validateSchemaUtil(updatePasswordSchema, req.body);

    // Validar la info de req.body. Esto lo hará JOI. Si hay errores, devolver un error
    // Llamar al servio
    await editPasswordUserService(
      id,
      oldPassword,
      newPassword,
      confirmNewPassword
    );

    const data = {
      success: true,
      status: "ok",
      message: "Contraseña actualizada correctamente",
    };

    // Respuesta personalizada
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
