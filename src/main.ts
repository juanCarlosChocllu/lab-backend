import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './core/config/AppConfigService';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService)
app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.enableCors({
    origin:'http://localhost:5173',
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe({
    transform:true
  }));
  await app.listen(appConfig.port,()=>{
    console.log(`servidor corriendo en el puerto:${appConfig.port}`);
    
  });
}
bootstrap();
