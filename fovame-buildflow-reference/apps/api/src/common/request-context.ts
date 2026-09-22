import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthContext } from './authorization.service';
export const CurrentAuth = createParamDecorator((_data:unknown, ctx:ExecutionContext):AuthContext=>{
  const req=ctx.switchToHttp().getRequest();
  // Reference implementation: replace header-derived context with real JWT/session resolution.
  return {
    userId:String(req.headers['x-user-id']??'00000000-0000-0000-0000-000000000001'),
    organizationId:String(req.headers['x-organization-id']??'00000000-0000-0000-0000-000000000002'),
    permissions:String(req.headers['x-permissions']??'PROJECT.VIEW,PROJECT.CREATE,RFQ.CREATE,RFQ.PUBLISH,RFQ.AWARD,PAYMENT.INITIATE,DELIVERY.CONFIRM,INVENTORY.ISSUE,SETTLEMENT.PREPARE,SETTLEMENT.APPROVE,AI.ASSISTANT.USE').split(',').map((x:string)=>x.trim()).filter(Boolean),
  };
});
