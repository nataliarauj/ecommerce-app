export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(
        message: string,
        errorCode: any,
        statusCode: number,
        errors: any
    ) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRET_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORIZED = 4001,
    PRODUCT_NOT_FOUND = 5001,
    ADDRESS_NOT_FOUND = 5002,
    ADDRESS_DOES_NOT_BELONG = 5003,
    ORDER_NOT_FOUND = 5004,
}
