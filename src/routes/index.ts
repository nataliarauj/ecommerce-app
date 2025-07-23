import { Router } from 'express';
import authRoutes from '../routes/auth';
import productsRoutes from './products';
import usersRoutes from './users';
import cartRoutes from './cart';
import { listOrders } from '../controllers/orders';
import ordersRoutes from './orders';
const rootRouter: Router = Router();

rootRouter.use('/users', usersRoutes);
rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
rootRouter.use('/cart', cartRoutes);
rootRouter.use('/orders', ordersRoutes);

export default rootRouter;
