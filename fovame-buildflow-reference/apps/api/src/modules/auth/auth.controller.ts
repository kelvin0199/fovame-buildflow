import { Body, Controller, Get, Post } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  @Post('login') login(@Body() body:{email:string;password:string}) { return {challenge:'MFA_REQUIRED', challenge_id:'reference-challenge', message:'Wire to real identity provider before production.'}; }
  @Post('mfa/verify') verify(@Body() _body:any) { return {access_token:'reference-token', expires_in:900}; }
  @Post('refresh') refresh(){ return {access_token:'reference-token',expires_in:900}; }
  @Post('logout') logout(){ return {success:true}; }
  @Get('sessions') sessions(){ return []; }
}
