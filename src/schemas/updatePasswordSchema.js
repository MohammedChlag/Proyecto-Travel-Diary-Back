import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const updatePasswordSchema = joi.object({
  oldPassword: joi
    .string()
    .required()
    .messages({
      ...joiErrorMessages,
      "string.empty": "La contraseña actual es obligatoria.",
    }),
  newPassword: joi
    .string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages({
      ...joiErrorMessages,
      "string.pattern.base":
        "La nueva contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.",
    }),
  confirmNewPassword: joi
    .string()
    .valid(joi.ref("newPassword"))
    .required()
    .messages({
      ...joiErrorMessages,
      "any.only":
        "La confirmación de la contraseña no coincide con la nueva contraseña.",
    }),
});
