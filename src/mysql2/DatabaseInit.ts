import { createConnection } from "./DatabaseConnection";

export const initializeDatabase = async () => {
  try {
    const connection = await createConnection();

    // Criar o banco de dados, se não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`);
    console.log("Banco de dados criado ou já existente.");

    // Selecionar o banco de dados
    await connection.query(`USE ${process.env.DATABASE}`);

    // Criar a tabela "pedido", se não existir
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS pedido (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente VARCHAR(255) NOT NULL,
        item VARCHAR(255) NOT NULL,
        quantidade INT NOT NULL,
        status ENUM('EM_PREPARO', 'PRONTO', 'ENTREGUE') NOT NULL,
        observacao TEXT
      );
    `;
    await connection.query(createTableQuery);
    console.log('Tabela "pedido" criada ou já existente.');

    await connection.end();
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    throw error;
  }
};