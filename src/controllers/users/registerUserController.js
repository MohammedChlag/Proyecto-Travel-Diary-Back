import validateSchemaUtil from "../../utils/ValidateSchema.js";
import { newUserSchema } from "../../schemas/newUserSchema.js";
import { registerUserService } from "../../services/users/registerUserService.js";

export const registerUserController = async (req, res, next) => {
  try {
    // Validar si hay datos
    await validateSchemaUtil(newUserSchema, req.body);

    // Recoger datos del body
    const { username, email, password } = req.body;

    // Llamar al service que registra al usuario
    const user = await registerUserService(username, email, password);

    // Respuesta
    res.status(201).send({
      status: "ok",
      message: "User registered, verify your email",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
