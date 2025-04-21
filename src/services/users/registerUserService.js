import randomstring from "randomstring";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { selectUserByUsernameModel } from "../../models/users/selectUserByUsernameModel.js";
import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { insertUserModel } from "../../models/users/insertUserModel.js";
import { sendEmailBrevoUtil } from "../../utils/sendEmailBrevo.js";
import generateErrorUtils from "../../utils/helpers.js";

export const registerUserService = async (username, email, password) => {
  // Buscar si el usuario ya existe por username
  const userByUsername = await selectUserByUsernameModel(username);
  if (userByUsername) {
    throw generateErrorUtils(
      400,
      "USER_ALREADY_EXISTS",
      "El username ya existe"
    );
  }

  // Buscar si el usuario ya existe por email
  const userByEmail = await selectUserByEmailModel(email);
  if (userByEmail) {
    throw generateErrorUtils(400, "EMAIL_ALREADY_EXISTS", "El email ya existe");
  }

  // Crear la id de usuario con crypto.randomUUID()
  const id = crypto.randomUUID();

  // Hash de la contraseña
  const passwordHash = await bcrypt.hash(password, 10); // 10 es el número de veces que se va a encriptar la contraseña. Cuanto mayor sea el número, más segura será la contraseña, pero también más lenta será la encriptación.

  // Generar código de registro
  // Codigo de registro del usuario. Lo he modificado a 15 en initDb.js
  const registrationCode = randomstring.generate(15);

  // Crear usuario
  const result = await insertUserModel({
    id,
    username,
    email,
    password: passwordHash,
    registrationCode,
  });

  if (result.affectedRows !== 1) {
    throw generateErrorUtils(500, "ERROR_DB", "No se pudo insertar el usuario");
  }

  // Enviar el mail de confirmación
  // Asunto del email
  const emailSubject = "Activa tu cuenta de Travel Diary";
  // Cuerpo del email
  const emailText = `
    <h2>¡Bienvenid@ ${username} a Travel Diary! 🗺️</h2>
    <p>Gracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:</p>
    <p><a href="http://localhost:5173/validate/${registrationCode}">Activa tu cuenta</a></p>
    `;
  // Llamar al servicio que envía el email
  await sendEmailBrevoUtil(email, emailSubject, emailText);

  // Devolver el usuario creado
  return { id, username, email, registrationCode };
};
