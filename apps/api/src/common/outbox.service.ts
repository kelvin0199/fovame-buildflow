import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Injectable()
export class OutboxService {
  constructor(private prisma:PrismaService){}
  create(tx:any, input:{organizationId:string;eventType:string;aggregateType:string;aggregateId:string;payload:any}){
    return tx.outboxEvent.create({data:{...input,payloadJson:input.payload}});
  }
}
