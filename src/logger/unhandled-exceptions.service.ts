import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomLogger } from './logger.service';

@Injectable()
export class UnhandledExceptionsService implements OnModuleInit {
  constructor(private readonly logger: CustomLogger) {
    this.logger.setContext('UnhandledExceptions');
  }

  onModuleInit(): void {
    this.setupUnhandledExceptionHandler();
    this.setupUnhandledRejectionHandler();
  }

  private setupUnhandledExceptionHandler(): void {
    process.on('uncaughtException', (error: Error) => {
      this.logger.error(`Uncaught Exception: ${error.message}`, error.stack);

      setTimeout(() => {
        process.exit(1);
      }, 1000);
    });
  }

  private setupUnhandledRejectionHandler(): void {
    process.on('unhandledRejection', (reason: unknown) => {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));

      this.logger.error(`Unhandled Rejection: ${error.message}`, error.stack);
    });
  }
}
