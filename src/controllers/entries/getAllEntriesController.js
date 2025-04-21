import { getAllEntriesService } from "../../services/entries/getAllEntriesService.js";

export const getAllEntriesController = async (req, res, next) => {
  try {
    // Obtener todas las entradas de la base de datos. Lo va a hacer el Service
    const entries = await getAllEntriesService();

    // Enviar las entradas al cliente
    res.status(200).send({
      status: "Ok",
      message: "Lista de entradas",
      data: { entries },
    });
  } catch (error) {
    next(error);
  }
};
