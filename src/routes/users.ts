import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import {
    addAddress,
    deleteAddress,
    listAddress,
    updateUser,
} from '../controllers/user';
import adminMiddleware from '../middlewares/admin';

const usersRoutes: Router = Router();

/**
 * @openapi
 * /address:
 *   post:
 *     summary: adicionar um endereço relacionado ao usuário
 *     tags:
 *         - Users
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */

usersRoutes.post(
    '/address',
    [authMiddleware, adminMiddleware],
    errorHandler(addAddress)
);

/**
 * @openapi
 * /address/:id:
 *   delete:
 *     summary: deletar um endereço de acordo com o Id do usuário
 *     tags:
 *         - Users
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */

usersRoutes.delete(
    '/address/:id',
    [authMiddleware],
    errorHandler(deleteAddress)
);

/**
 * @openapi
 * /address:
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
 * /:
 *   patch:
 *     summary: alterar um campo de endereço do usuário
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: Pode alterar qualquer campo
 */
usersRoutes.patch('/', [authMiddleware], errorHandler(updateUser));

export default usersRoutes;
