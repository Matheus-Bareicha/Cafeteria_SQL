import { Response,Request } from "express";
import { ListarPedidosPorStatusService } from "../service/ListarPedidosPorStatusService";

export class ListarPedidosPorStatusController {
    async handle(req: Request, res: Response) {
        const { status } = req.params;

        const listarPedidosPorStatusService = new ListarPedidosPorStatusService();

        const result = await listarPedidosPorStatusService.execute({ status });

        return res.status(result.status).json(result);
    }
}