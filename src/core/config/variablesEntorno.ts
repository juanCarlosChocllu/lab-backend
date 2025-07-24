import { ConfigModule, ConfigService } from "@nestjs/config";

ConfigModule.forRoot({isGlobal:true})
const configService = new ConfigService()

export const databaseUrl = configService.get<string>('DATABASE')
export const port = configService.get<string>('PORT')
export const key = configService.get<string>('KEY')
export const apiMia = configService.get<string>('API_MIA')