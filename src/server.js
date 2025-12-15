import app from './app.js';
import { initDB, closeDB } from "./config/db.js";
import { verifica_tabelas } from "./services/tableServices.js";

const PORT = process.env.PORT || 3007;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Servidor rodando!`);
  await initDB();
  await verifica_tabelas();
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});''