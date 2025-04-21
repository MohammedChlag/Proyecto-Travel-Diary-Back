import express from "express";

/* Importamos middlewares y controllers */
import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";
import { entryExistsMiddleware } from "../middlewares/entryExistsMiddleware.js";
import { canDoItMiddleware } from "../middlewares/canDoItMiddleware.js";

import { getAllEntriesController } from "../controllers/entries/getAllEntriesController.js";
import { getEntryByIdController } from "../controllers/entries/getEntryByIdController.js";
import { newEntryController } from "../controllers/entries/newEntryController.js";
import { editEntryController } from "../controllers/entries/editEntryController.js";
import { removeEntryController } from "../controllers/entries/removeEntryController.js";
import { newEntryPhotosController } from "../controllers/entries/newEntryPhotosController.js";
import { removeEntryPhotosController } from "../controllers/entries/removeEntryPhotoController.js";
import { newEntryVoteController } from "../controllers/entries/newEntryVoteController.js";

// Creamos el router
export const entriesRouter = express.Router();

// Endpoint para obtener todas las entradas
entriesRouter.get("/entries", getAllEntriesController);

// Endpoint para añadir entrada con imagenes o sin
entriesRouter.post("/entries", authUserMiddleware, newEntryController);

// Endpoint obtener entrada por :id
entriesRouter.get(
  "/entries/:id",
  entryExistsMiddleware,
  getEntryByIdController
);

// Endpoint para editar entrada
entriesRouter.put(
  "/entries/:id",
  authUserMiddleware,
  entryExistsMiddleware,
  canDoItMiddleware,
  editEntryController
);

// Endpoint para eliminar entrada
entriesRouter.delete(
  "/entries/:id",
  authUserMiddleware,
  entryExistsMiddleware,
  canDoItMiddleware,
  removeEntryController
);

// Endpoint para añadir imagenes a una entrada
entriesRouter.post(
  "/entries/:id/photos",
  authUserMiddleware,
  entryExistsMiddleware,
  canDoItMiddleware,
  newEntryPhotosController
);

//  Endpoint para eliminar fotos de una entrada
entriesRouter.delete(
  "/entries/:id/photos/:photoId",
  authUserMiddleware,
  entryExistsMiddleware,
  canDoItMiddleware,
  removeEntryPhotosController
);

//  Endpoint para votar una entrada
entriesRouter.post(
  "/entries/:id/votes",
  authUserMiddleware,
  entryExistsMiddleware,
  newEntryVoteController
);
