import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import {
	addAddress,
	changeUserRole,
	deleteAddress,
	getUserById,
	listAddress,
	listUsers,
	updateUser,
} from '../controllers/user';
import adminMiddleware from '../middlewares/admin';

const usersRoutes: Router = Router();

/**
 * @openapi
 * users/address:
 *   post:
 *     summary: adicionar um endereço relacionado ao usuário
 *     tags:
 *         - Users
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
usersRoutes.post('/address', [authMiddleware, adminMiddleware], errorHandler(addAddress));

/**
 * @openapi
 * users/address:
 *   get:
 *     summary: listar endereços cadastrados
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: Retorna um endereço
 */
usersRoutes.get('/address', [authMiddleware], listAddress);

/**
 * @openapi
 * users/:
 *   get:
 *     summary: listar todos os usuários
 *     tags:
 *         - Users
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
usersRoutes.get('/', [authMiddleware], errorHandler(listUsers));

/**
 * @openapi
 * /address/id:
 *   get:
 *     summary: listar usuário por id
 *     tags:
 *         - Users
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
usersRoutes.get('/:id', [authMiddleware], errorHandler(getUserById));

/**
 * @openapi
 * users/:
 *   patch:
 *     summary: alterar um campo de endereço do usuário
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: Pode alterar qualquer campo
 */
usersRoutes.patch('/', [authMiddleware], errorHandler(updateUser));

/**
 * @openapi
 * users/id/role:
 *   patch:
 *     summary: alterar o cargo do usuário
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: Pode alterar qualquer campo
 */
usersRoutes.patch(
	'/:id/role',
	[authMiddleware, adminMiddleware],
	errorHandler(changeUserRole)
);

/**
 * @openapi
 * users/address/id:
 *   delete:
 *     summary: deletar um endereço de acordo com o Id do usuário
 *     tags:
 *         - Users
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */

usersRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));

export default usersRoutes;
