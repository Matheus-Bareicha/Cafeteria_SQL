import { Request, Response } from "express";
import { ListarPedidosService } from "../service/ListarPedidosService";

export class ListarPedidosController {
    async handle(req: Request, res: Response) {
        const listarPedidosService = new ListarPedidosService();

        const result = await listarPedidosService.execute();

        return res.status(result.status).json(result);
    }
}