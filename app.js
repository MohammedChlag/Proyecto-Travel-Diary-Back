/* Importamos servidor y el puerto */
import server from "./src/config/server.js";
import { PORT } from "./src/config/env.js";

const puerto = PORT || 3001;

server.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto: ${puerto}`);
});
