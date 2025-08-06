import { Router } from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';

const authRoutes: Router = Router();

/**
 * @openapi
 * auth/signup:
 *   post:
 *     summary: cadastro de usuário na plataforma
 *     tags:
 *         - Auth
 *     responses:
 *       201:
 *         description: Created
 */
authRoutes.post('/signup', errorHandler(signup));

/**
 * @openapi
 * auth/:
 *   post:
 *     summary: realizar login de usuário
 *     tags:
 *         - Auth
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
authRoutes.post('/login', errorHandler(login));

/**
 * @openapi
 * auth/me:
 *   get:
 *     summary: retorna o usuário logado no momento
 *     tags:
 *         - Auth
 *     responses:
 *       200:
 *         description: [Descrição do retorno]
 */
authRoutes.get('/me', [authMiddleware], errorHandler(me));

export default authRoutes;
