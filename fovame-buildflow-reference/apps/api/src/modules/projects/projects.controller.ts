import { Body, Controller, Get, Param, Post } from '@nestjs/common'; import { ProjectsService } from './projects.service'; import { CurrentAuth } from '../../common/request-context'; import type { AuthContext } from '../../common/authorization.service';
@Controller('projects') export class ProjectsController { constructor(private service:ProjectsService){}
@Get() list(@CurrentAuth() a:AuthContext){return this.service.list(a.organizationId)}
@Post() create(@CurrentAuth() a:AuthContext,@Body() b:any){return this.service.create(a.organizationId,a.userId,b)}
@Get(':id') get(@CurrentAuth() a:AuthContext,@Param('id') id:string){return this.service.get(a.organizationId,id)} }
