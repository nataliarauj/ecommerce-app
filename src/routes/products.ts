import { Router } from 'express';
import { errorHandler } from '../error-handler';
import {
	createProduct,
	deleteProduct,
	getProductById,
	listProducts,
	searchProducts,
	updateProduct,
} from '../controllers/products';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const productsRoutes: Router = Router();

/**
 * @openapi
 * /search?q="":
 *   get:
 *     summary: pesquisar por produto por query
 *     tags:
 *         - Products
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
productsRoutes.get('/search', errorHandler(searchProducts));

/**
 * @openapi
 * /:
 *   post:
 *     summary: criar um novo produto
 *     tags:
 *         - Products
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
productsRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct));

/**
 * @openapi
 * /id:
 *   patch:
 *     summary: alterar campos da tabela produtos
 *     tags:
 *         - Products
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
productsRoutes.patch(
	'/:id',
	[authMiddleware, adminMiddleware],
	errorHandler(updateProduct)
);

/**
 * @openapi
 * /id:
 *   delete:
 *     summary: deletar produto por id
 *     tags:
 *         - Products
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
productsRoutes.delete(
	'/:id',
	[authMiddleware, adminMiddleware],
	errorHandler(deleteProduct)
);

/**
 * @openapi
 * /:
 *   get:
 *     summary: listar todos os produtos cadastrados
 *     tags:
 *         - Products
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
productsRoutes.get('/', errorHandler(listProducts));

/**
 * @openapi
 * /id:
 *   get:
 *     summary: pesquisar produto por id
 *     tags:
 *         - Products
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
productsRoutes.get(
	'/:id',
	[authMiddleware, adminMiddleware],
	errorHandler(getProductById)
);

export default productsRoutes;
