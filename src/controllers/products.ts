import { Request, Response } from 'express';
import { prismaClient } from '..';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const createProduct = async (req: Request, res: Response) => {
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(','),
        },
    });

    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',');
        }

        const updateProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id,
            },
            data: product,
        });

        res.json(updateProduct);
    } catch (err) {
        throw new NotFoundException(
            'Product not found',
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const deleteProduct = async (req: Request, res: Response) => {};

export const listProducts = async (req: Request, res: Response) => {
    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({
        skip: +req.query.skip! || 0,
        take: 5,
    });

    res.json({
        count,
        data: products,
    });
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +req.params.id,
            },
        });

        res.json(product);
    } catch (err) {
        throw new NotFoundException(
            'Product not found',
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};
