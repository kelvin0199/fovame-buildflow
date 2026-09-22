import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
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
  imports: [CommonModule, AuthModule, ProjectsModule, ProcurementModule, OrdersModule, PaymentsModule, LogisticsModule, InventoryModule, SettlementsModule, AiModule],
  controllers: [HealthController],
})
export class AppModule {}
