import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.PORT_DB),
    });
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};