import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileLoggerService } from './file-logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
    private context?: string;

    constructor(private readonly fileLogger: FileLoggerService) {}

    setContext(context: string): void {
        this.context = context;
    }

    private handleLogError(err: Error, type: string): void {
        console.error(`Failed to write ${type} log:`, err);
    }

    log(message: string): void {
        this.fileLogger.log(message, this.context)
            .catch(err => this.handleLogError(err, 'log'));
    }

    error(message: string, trace?: string): void {
        this.fileLogger.error(message, trace, this.context)
            .catch(err => this.handleLogError(err, 'error'));
    }

    warn(message: string): void {
        this.fileLogger.warn(message, this.context)
            .catch(err => this.handleLogError(err, 'warning'));
    }

    debug(message: string): void {
        this.fileLogger.debug(message, this.context)
            .catch(err => this.handleLogError(err, 'debug'));
    }

    verbose(message: string): void {
        this.fileLogger.verbose(message, this.context)
            .catch(err => this.handleLogError(err, 'verbose'));
    }

    logHttpRequest(req: Request, res: Response, responseTime: number): void {
        const { method, originalUrl, query, body } = req;
        const { statusCode } = res;
        
        const message = `HTTP ${method} ${originalUrl} ${statusCode} ${responseTime}ms`;
        const details = {
            query,
            body,
            statusCode,
            responseTime,
        };

        this.log(`${message} ${JSON.stringify(details)}`);
    }
}
