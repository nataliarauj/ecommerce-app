import { NextFunction, Request, Response } from 'express';
import { prismaClient } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validation';
import { signupSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    signupSchema.parse(req.body);
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
        new BadRequestException(
            'User already exists',
            ErrorCode.USER_ALREADY_EXISTS
        );
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
        },
    });

    res.json(user);
};

// /me -> return the logged in user
export const me = async (
    req: Request,
    res: Response,
) => {
    res.json(req.user);
};
