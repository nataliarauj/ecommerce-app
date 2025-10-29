import { HttpStatusCode } from 'axios';
import { ErrorCode, HttpException } from './root';

export class BadRequestException extends HttpException {
	constructor(message: string, errorCode: ErrorCode) {
		super(message, errorCode, HttpStatusCode.BadRequest, null);
	}
}
