export function humanizeStatus(status: string) { return status.toLowerCase().split('_').map(x=>x[0]?.toUpperCase()+x.slice(1)).join(' '); }
export function statusProjection<T extends {id:string;status:string;updatedAt?:Date;reference?:string}>(entity:T, allowedActions:string[], nextAction:string|null=null) {
  return {...entity, status_label:humanizeStatus(entity.status), allowed_actions:allowedActions, requires_user_action:allowedActions.length>0, next_action:nextAction, updated_at:(entity.updatedAt??new Date()).toISOString()};
}
