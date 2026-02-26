import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: (exception as Error)?.message || 'Internal server error' };

        response.status(status).json({
            success: false,
            error: {
                code: exception instanceof HttpException ? exception.name : 'InternalServerError',
                message: typeof errorResponse === 'string' ? errorResponse : (errorResponse as any).message || 'Internal server error',
                details: errorResponse,
            },
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
