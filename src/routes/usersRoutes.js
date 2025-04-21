import express from "express";

/* Importamos dcontrollers */
import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";
import { getAllUsersController } from "../controllers/users/getAllUsersController.js";
import { getUserByIdController } from "../controllers/users/getUserByIdController.js";
import { activeUserController } from "../controllers/users/activeUserController.js";
import { registerUserController } from "../controllers/users/registerUserController.js";
import { loginUserController } from "../controllers/users/loginUserController.js";
import { getOwnUserController } from "../controllers/users/getOwnUserController.js";
import { editUserController } from "../controllers/users/editUserController.js";
import { editPasswordUserController } from "../controllers/users/editPasswordUserController.js";
import { sendRecoverPassController } from "../controllers/users/sendRecoverPassController.js";
import { editPasswordByRecoveryController } from "../controllers/users/editPasswordByRecoveryController.js";
import { editAvatarUserController } from "../controllers/users/editAvatarUserController.js";
import { removeAvatarUserController } from "../controllers/users/removeAvatarUserController.js";

// Creamos el router
export const usersRouter = express.Router();

// Ruta para listar todos los usuarios
usersRouter.get("/users", getAllUsersController);

// Obtener usuario por :id
usersRouter.get("/users/:id", getUserByIdController);

// Ruta para registrar un usuario
usersRouter.post("/users/register", registerUserController);

// Ruta para activar un usuario
usersRouter.put("/users/active/:registrationCode", activeUserController);

// Ruta para loguear un usuario
usersRouter.post("/users/login", loginUserController);

// Ruta para obtener los datos de tu propio usuario
usersRouter.get("/user/own", authUserMiddleware, getOwnUserController);

// Ruta para actualizar los datos de tu usuario
usersRouter.put("/user/own", authUserMiddleware, editUserController);

// Ruta para actualizar la contraseña de tu usuario
usersRouter.put(
  "/users/password",
  authUserMiddleware,
  editPasswordUserController
);

// Ruta para recuperar la contraseña de un usuario
usersRouter.post("/users/password/recover", sendRecoverPassController);

// Ruta para cambiar la contraseña de un usuario recuperada
usersRouter.put("/users/password/recover", editPasswordByRecoveryController);

// Ruta para actualizar el avatar de tu usuario
usersRouter.put("/users/avatar", authUserMiddleware, editAvatarUserController);

// Ruta para borrar el avatar de tu usuario
usersRouter.delete(
  "/users/avatar",
  authUserMiddleware,
  removeAvatarUserController
);
