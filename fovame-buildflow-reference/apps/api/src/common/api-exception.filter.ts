import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { DomainError } from './domain-error';
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();
    const requestId = req.requestId ?? 'unknown';
    if (exception instanceof DomainError) return res.status(exception.status).json({error:{code:exception.code,message:exception.message,field_errors:exception.fieldErrors,request_id:requestId}});
    if (exception instanceof HttpException) return res.status(exception.getStatus()).json({error:{code:'HTTP_ERROR',message:exception.message,field_errors:[],request_id:requestId}});
    return res.status(500).json({error:{code:'INTERNAL_ERROR',message:'An unexpected error occurred.',field_errors:[],request_id:requestId}});
  }
}
