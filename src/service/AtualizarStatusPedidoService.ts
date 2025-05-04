import { createConnection } from "../mysql2/DatabaseConnection";

interface AtualizaStatusPedidoProps {
    id: number;
    status: string;
}
export class AtualizarStatusPedidoService {
    async execute({ id, status }: AtualizaStatusPedidoProps) {

        
        if (!id || typeof id !== "number" || isNaN(id) || id <= 0 ) {
            return {
                status: 400,
                message: "ID não informado ou inválido!",
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

            const [pedido] = await connection.query(
                'UPDATE pedido SET status = ? WHERE id = ?', [
                status,
                id,

            ]);

            await connection.end();

            if ((pedido as any).affectedRows === 0) {
                return {
                    status: 404,
                    message: "Pedido não encontrado.",
                };
            }

            return {
                status: 200,
                message: "Status do pedido atualizado com sucesso!",
                data: {
                    id,
                    status,
                },
            };
        } catch (error) {
            console.error("Erro ao atualizar o status do pedido:", error);

            return {
                status: 500,
                message: "Erro interno ao atualizar o status do pedido. Tente novamente mais tarde.",
            };
        }
    }
}