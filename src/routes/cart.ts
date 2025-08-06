import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import {
	addItemToCart,
	changeQuantity,
	deleteItemFromCart,
	getCart,
} from '../controllers/cart';

const cartRoutes: Router = Router();

/**
 * @openapi
 * cart/:
 *   post:
 *     summary: adicionar produtos no carrinho
 *     tags:
 *         - Cart
 *     responses:
 *       201:
 *         description: [Descrição do retorno]
 */
cartRoutes.post('/', [authMiddleware], errorHandler(addItemToCart));

/**
 * @openapi
 * cart/:
 *   get:
 *     summary: listar produtos do carrinho atual
 *     tags:
 *         - Cart
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
cartRoutes.get('/', [authMiddleware], errorHandler(getCart));

/**
 * @openapi
 * cart/id:
 *   get:
 *     summary: alterar item do carrinho
 *     tags:
 *         - Cart
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
cartRoutes.patch('/:id', [authMiddleware], errorHandler(changeQuantity));

/**
 * @openapi
 * cart/id:
 *   delete:
 *     summary: deletar item do carrinho
 *     tags:
 *         - Cart
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
cartRoutes.delete('/:id', [authMiddleware], errorHandler(deleteItemFromCart));

export default cartRoutes;
