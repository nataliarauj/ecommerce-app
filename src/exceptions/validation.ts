import { HttpStatusCode } from 'axios';
import { HttpException } from './root';

export class UnprocessableEntity extends HttpException {
	constructor(error: any, message: string, errorCode: number) {
		super(message, errorCode, HttpStatusCode.UnprocessableEntity, error);
	}
}
