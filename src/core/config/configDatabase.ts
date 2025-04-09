import { ConfigModule, ConfigService } from "@nestjs/config";

ConfigModule.forRoot({isGlobal:true})
const configService = new ConfigService()

export const databaseUrl = configService.get<string>('DATABASE')
export const port = configService.get<string>('PORT')