import express from "express";

/* Importamos dcontrollers */
import { getAllUsersController } from "../controllers/users/getAllUsersController.js";
import { getUserByIdController } from "../controllers/users/getUserByIdController.js";
import { activeUserController } from "../controllers/users/activeUserController.js";
import { registerUserController } from "../controllers/users/registerUserController.js";
import { loginUserController } from "../controllers/users/loginUserController.js";
import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";
import { getOwnUserController } from "../controllers/users/getOwnUserController.js";

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
