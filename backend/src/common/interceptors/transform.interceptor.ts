import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DefResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, DefResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<DefResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        message: '操作成功',
        timestamp: new Date().toISOString(),
      }))
    );
  }
}
