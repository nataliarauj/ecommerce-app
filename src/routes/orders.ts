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

ordersRoutes.post('/', [authMiddleware], errorHandler(createOrder));
ordersRoutes.get('/', [authMiddleware], errorHandler(listOrders));
ordersRoutes.patch('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
ordersRoutes.delete('/:id', [authMiddleware], errorHandler(getOrderById));

export default ordersRoutes;
