export const getEntryByIdController = async (req, res, next) => {
  try {
    // Obtener la entry de la request
    const entry = req.entry;

    // Responder con la entrada
    res.status(200).send({
      status: "Ok",
      message: "Entrada encontrada",
      data: { entry },
    });
  } catch (error) {
    next(error);
  }
};
