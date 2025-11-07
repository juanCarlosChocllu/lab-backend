import { Module } from '@nestjs/common';
import { ProviderNovarService } from './provider-novar.service';
import { ProviderNovarController } from './provider-novar.controller';
import { CoreModule } from 'src/core/core.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [CoreModule],
  controllers: [ProviderNovarController],
  providers: [ProviderNovarService],
    exports: [ProviderNovarService]
})
export class ProviderNovarModule {}
