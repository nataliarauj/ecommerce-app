import { HttpStatusCode } from 'axios';
import { ErrorCode, HttpException } from './root';

export class NotFoundException extends HttpException {
	constructor(message: string, errorCode: ErrorCode) {
		super(message, errorCode, HttpStatusCode.NotFound, null);
	}
}
