import { Request, Response } from 'express';
import { prismaClient } from '..';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";


export const signup = async (req: Request, res: Response) => {
    const {email, password, name} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});

    if (user) {
        return res.status(409).json({
            message: 'User already exists!'
        });
    } 

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });

    res.json(user);
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    let user = await prismaClient.user.findFirst({where: {email}});

    if (!user) {
        return res.status(404).json({
            message: 'User does not exists!'
        });
    }

    if (!compareSync(password, user.password)) {
        return res.status(400).json({
            message: 'Incorrect password!'
        });
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET);
    
    res.json({user, token});

}