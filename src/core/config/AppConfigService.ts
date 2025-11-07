import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE');
  }

  get port(): string {
    return this.configService.get<string>('PORT');
  }

  get key(): string {
    return this.configService.get<string>('KEY');
  }

  get apiMia(): string {
    return this.configService.get<string>('API_MIA');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get sqlUser(): string {
    return this.configService.get<string>('USER_SQL');
  }

  get sqlServer(): string {
    return this.configService.get<string>('SERVER_SQL');
  }

  get passwordSql(): string {
    return this.configService.get<string>('PASSWORD_SQL');
  }

  get databaseSql(): string {
    return this.configService.get<string>('DATABASE_SQL');
  }
}
