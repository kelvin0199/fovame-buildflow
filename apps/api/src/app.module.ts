import { Module } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { AuditService } from './modules/audit/audit.service';
import { AuthorizationService } from './common/authorization.service';
import { IdempotencyService } from './common/idempotency.service';
import { OutboxService } from './common/outbox.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LogisticsModule } from './modules/logistics/logistics.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { AiModule } from './modules/ai/ai.module';
import { HealthController } from './health.controller';

@Module({
  imports: [AuthModule, ProjectsModule, ProcurementModule, OrdersModule, PaymentsModule, LogisticsModule, InventoryModule, SettlementsModule, AiModule],
  controllers: [HealthController],
  providers: [PrismaService, AuditService, AuthorizationService, IdempotencyService, OutboxService],
  exports: [PrismaService, AuditService, AuthorizationService, IdempotencyService, OutboxService],
})
export class AppModule {}
