import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './core/config/variablesEntorno';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    transform:true
  }));
  await app.listen(port,()=>{
    console.log(`servidor corriendo en el puerto:${port}`);
    
  });
}
bootstrap();
