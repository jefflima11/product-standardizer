import app from './app.js';
import { iniDB, closeDB } from './src/config/db.js';

const PORT = process.env.PORT || 3007;

app.listen(PORT, async () => {
  console.log(`Servidor rodando!`);
  await iniDB();
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});