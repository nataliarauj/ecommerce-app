import { Router } from 'express';
import authRoutes from '../routes/auth';
import productsRoutes from './products';
const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);

export default rootRouter;
