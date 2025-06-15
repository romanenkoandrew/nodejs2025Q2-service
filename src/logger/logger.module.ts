import { Global, Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { HttpLoggerInterceptor } from './http-logger.interceptor';
import { AllExceptionsFilter } from './exception.filter';
import { UnhandledExceptionsService } from './unhandled-exceptions.service';
import { FileLoggerService } from './file-logger.service';

@Global()
@Module({
  providers: [
    FileLoggerService,
    CustomLogger,
    HttpLoggerInterceptor,
    AllExceptionsFilter,
    UnhandledExceptionsService,
  ],
  exports: [
    FileLoggerService,
    CustomLogger,
    HttpLoggerInterceptor,
    AllExceptionsFilter,
    UnhandledExceptionsService,
  ],
})
export class LoggerModule {}
