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
ordersRoutes.get('/', errorHandler(listOrders));
ordersRoutes.get('/:id', errorHandler(getOrderById));
ordersRoutes.patch('/:id/cancel', errorHandler(cancelOrder));

export default ordersRoutes;
