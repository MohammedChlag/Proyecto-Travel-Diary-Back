import express from "express";

import { usersRouter } from "./usersRoutes.js";
// import { entriesRouter } from "./entriesRoutes.js";

/* Creamos el router */
const router = express.Router();

router.use(usersRouter);
// router.use(entriesRouter);

export default router;
