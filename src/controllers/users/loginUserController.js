import { loginUserSchema } from "../../schemas/loginUserSchema.js";
import { loginUserService } from "../../services/users/loginUserService.js";
import validateSchemaUtil from "../../utils/ValidateSchema.js";

export const loginUserController = async (req, res, next) => {
  try {
    // Recoger datos del body
    const { email, password } = req.body;

    // Validar si hay datos
    await validateSchemaUtil(loginUserSchema, req.body);

    // Llamar al service que loguea al usuario. Devuelve el token
    const token = await loginUserService(email, password);

    // Enviar respuesta
    res
      .status(200)
      .send({ status: "ok", message: "User logged", data: { token } });
  } catch (error) {
    next(error);
  }
};
