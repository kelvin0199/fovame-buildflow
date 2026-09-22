import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
@Injectable()
export class AuditService {
  constructor(private prisma:PrismaService){}
  append(input:{organizationId:string;actorType:string;actorId?:string;action:string;entityType:string;entityId:string;requestId:string;source:string;before?:any;after?:any;metadata?:any}){
    return this.prisma.auditEvent.create({data:{organizationId:input.organizationId,actorType:input.actorType,actorId:input.actorId,action:input.action,entityType:input.entityType,entityId:input.entityId,requestId:input.requestId,source:input.source,beforeJson:input.before,afterJson:input.after,metadataJson:input.metadata??{}}});
  }
}
