import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { prismaClient } from '..';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		next(new UnauthorizedException('Unauthorized', 401, ErrorCode.UNAUTHORIZED));
	}

	const token = authHeader;

	try {
		const payload = jwt.verify(token!, JWT_SECRET) as any;
		const user = await prismaClient.user.findFirst({
			where: { id: payload.userId },
		});

		if (!user) {
			next(new UnauthorizedException('Unauthorized', 401, ErrorCode.UNAUTHORIZED));
		}

		req.user = user as any;
		next();
	} catch (err) {
		next(new UnauthorizedException('Unauthorized', 401, ErrorCode.UNAUTHORIZED));
	}
};

export default authMiddleware;
