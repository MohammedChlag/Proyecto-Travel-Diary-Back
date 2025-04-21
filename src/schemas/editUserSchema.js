import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const editUserSchema = joi.object({
  username: joi
    .string()
    .min(3)
    .max(50)
    .allow("", null)
    .messages(joiErrorMessages),
  firstName: joi
    .string()
    .min(1)
    .max(50)
    .allow("", null)
    .messages(joiErrorMessages),
  lastName: joi
    .string()
    .min(1)
    .max(50)
    .allow("", null)
    .messages(joiErrorMessages),
  email: joi.string().email().optional().messages(joiErrorMessages),
});
