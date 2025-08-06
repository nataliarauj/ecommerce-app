import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import {
	cancelOrder,
	createOrder,
	getOrderById,
	listOrders,
} from '../controllers/orders';

const ordersRoutes: Router = Router();

/**
 * @openapi
 * /:
 *   post:
 *     summary: criar um novo pedido
 *     tags:
 *         - Orders
 *     responses:
 *       200:
 *         description: primeiro, é necessário (...) adicionar itens no carrinho para depois fazer a requisição post da tabela 'order'
 */

ordersRoutes.post('/', [authMiddleware], errorHandler(createOrder));

/**
 * @openapi
 * /:
 *   get:
 *     summary: listar todos as compras
 *     tags:
 *         - Orders
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
ordersRoutes.get('/', errorHandler(listOrders));

/**
 * @openapi
 * /id:
 *   get:
 *     summary: listar compra por id
 *     tags:
 *         - Orders
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
ordersRoutes.get('/:id', errorHandler(getOrderById));

/**
 * @openapi
 * /id/cancel:
 *   get:
 *     summary: cancelar compra
 *     tags:
 *         - Orders
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
ordersRoutes.patch('/:id/cancel', errorHandler(cancelOrder));

export default ordersRoutes;
