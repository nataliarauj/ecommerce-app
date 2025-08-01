import { Request, Response } from 'express';
import { prismaClient } from '..';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const createOrder = async (req: Request, res: Response) => {
    return await prismaClient.$transaction(async (tx) => {
        console.log(req.user);
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                product: true,
            },
        });

        if (cartItems.length == 0) {
            return res.json({ message: 'The cart is empty' });
        }

        const price = cartItems.reduce((prev, current) => {
            return prev + current.quantity * +current.product.price;
        }, 0);

        const address = await tx.address.findFirst({
            where: {
                id: req.user.id,
            },
        });
        console.log(address);

        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address?.formattedAddress!,
                product: {
                    create: cartItems.map((cart) => {
                        return {
                            productId: cart.productId,
                            quantity: cart.quantity,
                        };
                    }),
                },
            },
        });

        console.log(order);

        const orderEvent = await tx.orderEvent.create({
            data: {
                orderId: order.id,
            },
        });

        await tx.cartItem.deleteMany({
            where: {
                userId: req.user.id,
            },
        });

        return res.json(order);
    });
};

export const listOrders = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id,
        },
    });
    res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.update({
            where: {
                id: +req.params.id,
            },
            data: {
                status: 'CANCELLED',
            },
        });
        await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: 'CANCELLED',
            },
        });
        res.json(order);
    } catch (err) {
        throw new NotFoundException(
            'Order not found',
            ErrorCode.ORDER_NOT_FOUND
        );
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id,
            },
            include: {
                product: true,
                events: true,
            },
        });

        res.json(order);
    } catch (err) {
        throw new NotFoundException(
            'Order not found',
            ErrorCode.ORDER_NOT_FOUND
        );
    }
};
