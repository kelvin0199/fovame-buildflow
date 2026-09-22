import 'reflect-metadata';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ApiExceptionFilter } from '../src/common/api-exception.filter';
import { RequestIdInterceptor } from '../src/common/request-id.interceptor';

let cachedServer: ReturnType<typeof express> | undefined;

async function createServer() {
  if (cachedServer) return cachedServer;
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new RequestIdInterceptor());
  const configuredOrigins = (process.env.CORS_ORIGINS ?? '').split(',').map((origin) => origin.trim()).filter(Boolean);
  app.enableCors({ origin: configuredOrigins.length ? configuredOrigins : true, credentials: true });
  await app.init();
  cachedServer = expressApp;
  return cachedServer;
}

export default async function handler(req: express.Request, res: express.Response) {
  const server = await createServer();
  return server(req, res);
}
