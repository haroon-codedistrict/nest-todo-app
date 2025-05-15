import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { apiErrorResponse } from 'src/utils/helpers/common.helper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        
        const errStatus = exception.getStatus();
        const errResponse = exception.getResponse() as any;

        return response
            .status(errStatus)
            .json(apiErrorResponse(errStatus, exception.message, errResponse.message, {
                path: request.url,
            }));
    }
}
