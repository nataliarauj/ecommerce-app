import { Request, Response } from 'express';
import { prismaClient } from '..';

export const createOrder = async (req: Request, res: Response) => { 

    return await prismaClient.$transaction(async(tx) => {
        console.log(req.user)
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        });

        if (cartItems.length == 0) {
            return res.json({message: 'The cart is empty'});
        }

        const price = cartItems.reduce((prev, current) => {
            return prev + (current.quantity * +current.product.price)
        }, 0);

        const address = await tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddress!
            }
        });
        console.log(address)
 
        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address?.formattedAddress!,
                product: {
                    create: cartItems.map((cart) => {
                        return {
                            productId: cart.productId,
                            quantity: cart.quantity
                        }
                    })
                }
            }
        })

        console.log(order)
        

        const orderEvent = await tx.orderEvent.create({
            data: {
                orderId: order.id,
            }
        })

        await tx.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        })

        return res.json(order);
    })
    

}   

export const listOrders = async (req: Request, res: Response) => {
     const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.json(orders)
}   

export const cancelOrder = async (req: Request, res: Response) => {

}   

export const getOrderById = async (req: Request, res: Response) => {

}   