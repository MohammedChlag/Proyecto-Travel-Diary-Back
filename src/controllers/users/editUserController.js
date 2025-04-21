import { editUserSchema } from "../../schemas/editUserSchema.js";
import { editUserService } from "../../services/users/editUserService.js";
import validateSchemaUtil from "../../utils/ValidateSchema.js";

export const editUserController = async (req, res, next) => {
  try {
    // Obtener el id de los params
    const { id } = req.user;
    // Obtener los datos del body
    const newUserInfo = req.body;

    // Validar los datos. Esto lo va a hacer JOI. Si hay errores, devolver un error 400
    await validateSchemaUtil(editUserSchema, req.body);

    // Actualizar los datos del usuario
    const updatedUser = await editUserService(id, newUserInfo);
    // Responder al cliente
    res.status(200).send({
      status: "ok",
      message: "usuario actualizado",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
