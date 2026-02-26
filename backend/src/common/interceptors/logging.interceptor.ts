import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, body, query, params } = request;
    const now = Date.now();

    this.logger.log(
      `Request: ${method} ${url} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(params)}`,
    );

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        const delay = Date.now() - now;
        this.logger.log(
          `Response: ${method} ${url} ${statusCode} - ${delay}ms`,
        );
      }),
    );
  }
}
