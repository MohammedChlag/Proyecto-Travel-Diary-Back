import { newEntryVoteService } from "../../services/entries/newEntryVoteService.js";

export const newEntryVoteController = async (req, res, next) => {
  try {
    // Obtener los datos necesarios
    const { id: userId } = req.user;
    const { id: entryId } = req.entry;

    // Obtener el voto del body
    const { value } = req.body;

    // Realizar la votación
    const entry = await newEntryVoteService(userId, entryId, value);

    // Responder con la entrada actualizada
    res.status(200).send({
      success: true,
      status: "ok",
      message: "Votación realizada con éxito",
      data: { entry },
    });
  } catch (error) {
    next(error);
  }
};
