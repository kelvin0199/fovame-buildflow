import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthorizationService } from './authorization.service';
import { IdempotencyService } from './idempotency.service';
import { OutboxService } from './outbox.service';
import { AuditService } from '../modules/audit/audit.service';

@Global()
@Module({
  providers: [PrismaService, AuthorizationService, IdempotencyService, OutboxService, AuditService],
  exports: [PrismaService, AuthorizationService, IdempotencyService, OutboxService, AuditService],
})
export class CommonModule {}
