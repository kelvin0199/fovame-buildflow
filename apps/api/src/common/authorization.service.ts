import { Injectable } from '@nestjs/common';
import { DomainError } from './domain-error';
export type AuthContext={userId:string;organizationId:string;permissions:string[];projectIds?:string[];approvalLimitMinor?:bigint};
@Injectable()
export class AuthorizationService {
  assert(ctx:AuthContext, permission:string, opts:{projectId?:string;amountMinor?:bigint;actorIsRequester?:boolean;allowedActions?:string[];action?:string}={}) {
    if(!ctx.permissions.includes(permission)) throw new DomainError('FORBIDDEN','You do not have permission to perform this action.',403);
    if(opts.projectId && ctx.projectIds && !ctx.projectIds.includes(opts.projectId)) throw new DomainError('PROJECT_SCOPE_DENIED','Project access is restricted.',403);
    if(opts.amountMinor!==undefined && ctx.approvalLimitMinor!==undefined && opts.amountMinor>ctx.approvalLimitMinor) throw new DomainError('APPROVAL_LIMIT_EXCEEDED','This amount exceeds your approval limit.',403);
    if(opts.actorIsRequester) throw new DomainError('SEGREGATION_OF_DUTIES','The requester cannot approve this action.',403);
    if(opts.action && opts.allowedActions && !opts.allowedActions.includes(opts.action)) throw new DomainError('ACTION_NOT_ALLOWED','This action is not available in the current state.',409);
  }
}
