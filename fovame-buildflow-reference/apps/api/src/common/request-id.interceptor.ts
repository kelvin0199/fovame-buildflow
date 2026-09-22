import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { map } from 'rxjs/operators';
@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const res = ctx.switchToHttp().getResponse();
    req.requestId = req.headers['x-request-id'] || randomUUID();
    res.setHeader('X-Request-ID', req.requestId);
    return next.handle().pipe(map(data => data?.data && data?.meta ? data : ({data, meta:{request_id:req.requestId}})));
  }
}
