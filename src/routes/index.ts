import { Router } from 'express';
import authRoutes from '../routes/auth';
import productsRoutes from './products';
import usersRoutes from './users';
const rootRouter: Router = Router();

rootRouter.use('/users', usersRoutes);
rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);


export default rootRouter;
