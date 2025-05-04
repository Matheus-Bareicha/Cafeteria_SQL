import { Request, Response } from "express";
import { CriarPedidoService } from "../service/CriarPedidoService";

export class CriarPedidoController {
    async handle(req: Request, res: Response) {
        const { cliente, item, quantidade, observacao } = req.body;

        const criarPedidoService = new CriarPedidoService();

        const result = await criarPedidoService.execute({
            cliente,
            item,
            quantidade,
            observacao,
        });

        return res.status(result.status).json(result);
    }
}