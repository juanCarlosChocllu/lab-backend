import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { AppConfigService } from './config/AppConfigService';
import { JwtModule} from '@nestjs/jwt';

@Module({
  imports:[],
  controllers: [CoreController],
  providers: [CoreService,AppConfigService],
  exports:[AppConfigService]
})
export class CoreModule {}
