/* Importamos dependencias necesarias */
import express from "express";
import morgan from "morgan";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";

/* Importamos rutas y variables de entorno */
import { UPLOADS_DIR } from "./env.js";
import router from "../routes/index.js";
import generateErrorUtils from "../utils/helpers.js";

const server = express();

/* MIDLEWARES */
server.use(morgan("dev"));
server.use(express.json()); // Para transformar el JSON que viene en el body de la petición a un objeto de JavaScript
server.use(fileupload()); // Prepara mi server para recibir archivos en las peticiones a traves del body
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`); // Definimos la ruta donde se subirán los archivos
server.use("/uploads", express.static(uploadsDir)); // Definimos la ruta como directorio estático donde se subirán los archivos
server.use(cors()); // Para permitir peticiones desde cualquier origen

/* ROUTERS */
server.use(router);

/* ERRORES */
// Ruta no encontrada
server.use((req, res, next) => {
  next(
    generateErrorUtils(
      404,
      "ROUTE_NOT_FOUND",
      `No se encontró la ruta: ${req.originalUrl}`
    )
  );
});

//Gestor de errores
server.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    httpStatus: error.httpStatus || 500,
    code: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message,
  });
});

export default server;
