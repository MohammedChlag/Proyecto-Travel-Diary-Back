import { getUserByIdService } from "../../services/users/getUserByIdService.js";

export const getUserByIdController = async (req, res, next) => {
  try {
    // Obtener el id del usuario
    const { id } = req.params;

    // Obtener el usuario
    const user = await getUserByIdService(id);

    // Responder con el usuario
    res.status(200).send({
      status: "OK",
      message: "Usuario encontrado",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
