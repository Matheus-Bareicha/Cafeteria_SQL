import { Router, Request, Response } from 'express';
import { CriarPedidoController } from './controller/CriarPedidoController';
import { ListarPedidosController } from './controller/ListarPedidosController';
import { AtualizarStatusPedidoController } from './controller/AtualizarStatusPedidoController';
import { ListarPedidosPorStatusController } from './controller/ListarPedidosPorStatusController';

const router = Router();

     router.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
        });

     router.post('/CriarPedido', (req: Request, res: Response) => {
        new CriarPedidoController().handle(req, res);
        });

      router.get('/ListarPedidos', (req: Request, res: Response) => {
        new ListarPedidosController().handle(req, res);
         });
      router.patch('/AtualizarStatusPedido/:id', (req: Request, res: Response) => {
        new AtualizarStatusPedidoController().handle(req, res);
      });
      router.get('/ListarPedidosPorStatus/:status', (req: Request, res: Response) => {
        new ListarPedidosPorStatusController().handle(req, res);
      });

    


export default router;
