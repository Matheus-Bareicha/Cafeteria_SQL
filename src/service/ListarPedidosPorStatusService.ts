import { createConnection } from "../mysql2/DatabaseConnection";

interface ListarPedidosPorStatusProps {
    status: string;
}

export class ListarPedidosPorStatusService {
    async execute({ status }: ListarPedidosPorStatusProps) {
        status = status.toUpperCase();

        if (!status) {
            return {
                status: 400,
                message: "Status não informado!",
            };
        }
        const validStatus = ["EM_PREPARO", "PRONTO", "ENTREGUE"];
        status = status.toUpperCase();

        if (!validStatus.includes(status)) {
            return {
                status: 400,
                message: `Status inválido! Os valores permitidos são: ${validStatus.join(", ")}`,
            };
        }

        try {
            const connection = await createConnection();

            const [pedidos] = await connection.query(
                'SELECT * FROM pedido WHERE status = ?',
                [status]
            );

            await connection.end();


            if (!Array.isArray(pedidos) || pedidos.length === 0) {
                return {
                    status: 404,
                    message: "Nenhum pedido encontrado.",
                };
            }

            return {
                status: 200,
                message: `Pedidos com status -${status}- listados com sucesso!`,
                data: pedidos,
            };
            
        } catch (error) {
            console.error("Erro ao listar pedidos por status:", error);

            return {
                status: 500,
                message: "Erro interno ao listar os pedidos. Tente novamente mais tarde.",
            };
        }
    }
}