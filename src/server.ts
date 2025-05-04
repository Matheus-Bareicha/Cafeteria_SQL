import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';
import { initializeDatabase } from './mysql2/DatabaseInit';

dotenv.config();

const app = express();
const PORT = process.env.PORT_APP

app.use(express.json());
app.use('/', routes);

const startServer = async () => {
  try {
    await initializeDatabase(); // Inicializar o banco de dados

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();