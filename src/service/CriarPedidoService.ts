import { createConnection } from "../mysql2/DatabaseConnection";

interface CriarPedidoProps {
    cliente: string;
    item: string;
    quantidade: number;
    observacao?: string;
}

export class CriarPedidoService {
    async execute({ cliente, item, quantidade, observacao }: CriarPedidoProps) {

        if (!cliente || cliente.trim() === "") {
            return {
                status: 400,
                message: "Cliente não informado ou inválido!",
            };
        }

        if (!item || item.trim() === "") {
            return {
                status: 400,
                message: "item não informado ou inválido!",
            };
        }

        if (!quantidade || quantidade <= 0) {
            return {
                status: 400,
                message: "Quantidade deve ser maior que zero!",
            };
        }

        try {
            const connection = await createConnection();

            const [pedido] = await connection.query(
                'INSERT INTO pedido (cliente, item, quantidade, observacao, status) VALUES (?, ?, ?, ?, ?)', [
                cliente,
                item,
                quantidade,
                observacao || '',
                "EM_PREPARO",
            ]);

            await connection.end();

            return {
                status: 201,
                message: "Pedido criado com sucesso!",
                data: {
                    id: (pedido as any).insertId, // Obter o ID do pedido criado
                    cliente,
                    item,
                    quantidade,
                    observacao,
                    status: "EM_PREPARO",
                },
            };
        } catch (error) {
            console.error("Erro ao criar pedido:", error);

            return {
                status: 500,
                message: "Erro interno ao criar o pedido. Tente novamente mais tarde.",
            };
        }
        
    }
}