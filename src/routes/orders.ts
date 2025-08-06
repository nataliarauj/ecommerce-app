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
 *  orders/:
 *   post:
 *     summary: criar um novo pedido
 *     tags:
 *         - Orders
 *     responses:
 *       200:
 *         description: [Desc]
 */
ordersRoutes.post('/', [authMiddleware], errorHandler(createOrder));

/**
 * @openapi
 * 	orders/:
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
 * orders/id/:
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
 * orders/id/cancel:
 *   patch:
 *     summary: cancelar compra
 *     tags:
 *         - Orders
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
ordersRoutes.patch('/:id/cancel', errorHandler(cancelOrder));

export default ordersRoutes;
