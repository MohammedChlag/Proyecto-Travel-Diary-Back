import { getAllUsersService } from "../../services/users/getAllUsersService.js";

export const getAllUsersController = async (req, res, next) => {
  try {
    // Obtener todos los usuarios de la base de datos.
    const users = await getAllUsersService();

    // Responder con los usuarios
    res.status(200).send({
      status: "Ok",
      message: "Lista de usuarios",
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};
