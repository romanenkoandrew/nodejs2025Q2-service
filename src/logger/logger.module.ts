import { Global, Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { HttpLoggerInterceptor } from './http-logger.interceptor';
import { AllExceptionsFilter } from './exception.filter';
import { UnhandledExceptionsService } from './unhandled-exceptions.service';

@Global()
@Module({
  providers: [
    CustomLogger,
    HttpLoggerInterceptor,
    AllExceptionsFilter,
    UnhandledExceptionsService,
  ],
  exports: [
    CustomLogger,
    HttpLoggerInterceptor,
    AllExceptionsFilter,
    UnhandledExceptionsService,
  ],
})

export class LoggerModule {}
