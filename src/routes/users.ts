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

usersRoutes.post(
    '/address',
    [authMiddleware, adminMiddleware],
    errorHandler(addAddress)
);
usersRoutes.delete(
    '/address/:id',
    [authMiddleware],
    errorHandler(deleteAddress)
);
usersRoutes.get('/address', [authMiddleware], listAddress);
usersRoutes.patch('/', [authMiddleware], errorHandler(updateUser));

export default usersRoutes;
