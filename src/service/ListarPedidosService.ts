import { createConnection } from "../mysql2/DatabaseConnection";


export class ListarPedidosService {
    async execute() {
        try {
            const connection = await createConnection();

            const [pedidos] = await connection.query(
                'SELECT * FROM pedido'
            );

            if (!Array.isArray(pedidos) || pedidos.length === 0) {
                return {
                    status: 404,
                    message: "Nenhum pedido encontrado.",
                };
            }

            return {
                status: 200,
                message: "Pedidos listados com sucesso!",
                data: pedidos,
            };
        } catch (error) {
            console.error("Erro ao listar pedidos:", error);

            return {
                status: 500,
                message: "Erro interno ao listar os pedidos. Tente novamente mais tarde.",
            };
        }
    }
}