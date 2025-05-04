import { Request,Response } from "express";
import { AtualizarStatusPedidoService } from "../service/AtualizarStatusPedidoService";

export class AtualizarStatusPedidoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        const service = new AtualizarStatusPedidoService();

        const result = await service.execute({ id: Number(id), status });

        return res.status(result.status).json(result);
    }
}