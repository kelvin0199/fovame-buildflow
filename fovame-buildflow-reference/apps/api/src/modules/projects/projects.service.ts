import { Injectable } from '@nestjs/common'; import { PrismaService } from '../../common/prisma.service'; import { statusProjection } from '../../common/status-projection';
@Injectable() export class ProjectsService { constructor(private prisma:PrismaService){}
  list(org:string){return this.prisma.project.findMany({where:{organizationId:org},orderBy:{updatedAt:'desc'}})}
  async create(org:string,userId:string,input:{code:string;name:string;type?:string;budget_minor:number;currency:string}){const p=await this.prisma.project.create({data:{organizationId:org,code:input.code,name:input.name,type:input.type,budgetMinor:BigInt(input.budget_minor),currency:input.currency}});return statusProjection({...p,status:p.status},['CREATE_RFQ','UPLOAD_BOQ']);}
  async get(org:string,id:string){const p=await this.prisma.project.findFirstOrThrow({where:{id,organizationId:org}});return statusProjection({...p,status:p.status},['CREATE_RFQ','UPLOAD_BOQ']);}
}
