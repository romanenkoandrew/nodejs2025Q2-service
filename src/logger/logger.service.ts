import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
    private context?: string;

    setContext(context: string): void {
        this.context = context;
    }

    private formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        const context = this.context ? `[${this.context}]` : '';
        return `${timestamp} ${level} ${context} ${message}`;
    }

    log(message: string): void {
        console.log(this.formatMessage('LOG', message));
    }

    error(message: string, trace?: string): void {
        console.error(this.formatMessage('ERROR', message));
        if (trace) {
            console.error(trace);
        }
    }

    warn(message: string): void {
        console.warn(this.formatMessage('WARN', message));
    }

    debug(message: string): void {
        console.debug(this.formatMessage('DEBUG', message));
    }

    verbose(message: string): void {
        console.log(this.formatMessage('VERBOSE', message));
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
