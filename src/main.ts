import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './logger/logger.service';
import { HttpLoggerInterceptor } from './logger/http-logger.interceptor';
import { AllExceptionsFilter } from './logger/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new CustomLogger());
  app.useGlobalInterceptors(app.get(HttpLoggerInterceptor));
  app.useGlobalFilters(app.get(AllExceptionsFilter));
  
  await app.listen(port);
}
bootstrap();
