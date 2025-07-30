import { Request, Response, NextFunction } from 'express';
import { ErrorCode, HttpException } from './exceptions/root';
import { InternalExecption } from './exceptions/internal-execption';
import { ZodError } from 'zod';
import { BadRequestException } from './exceptions/bad-request';

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException) {
                exception = err;
            } else {
                if (err instanceof ZodError) {
                    console.log(err);
                    exception = new BadRequestException(
                        'Unprocessable entity',
                        ErrorCode.UNPROCESSABLE_ENTITY
                    );
                } else {
                    console.log(err);
                    exception = new InternalExecption(
                        'Something when wrong',
                        err,
                        ErrorCode.INTERNAL_EXCEPTION
                    );
                }
            }
            next(exception);
        }
    };
};
