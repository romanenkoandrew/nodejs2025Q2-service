import { Injectable } from '@nestjs/common';
import { mkdir, appendFile, stat, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { ConfigService } from '@nestjs/config';

const DEFAULT_MAX_FILE_SIZE = 100000;
const DEFAULT_LOG_DIR = 'logs';
const DEFAULT_ERROR_LOG_FILE = 'error.0.log';
const DEFAULT_COMBINED_LOG_FILE = 'combined.0.log';

@Injectable()
export class FileLoggerService {
  private readonly logDir = DEFAULT_LOG_DIR;
  private maxFileSize = 0;
  private currentErrorFile: string;
  private currentCombinedFile: string;

  constructor(private readonly configService: ConfigService) {
    this.initializeLogDirectory();
    this.currentErrorFile = DEFAULT_ERROR_LOG_FILE;
    this.currentCombinedFile = DEFAULT_COMBINED_LOG_FILE;
    this.maxFileSize = this.configService.get<number>(
      'MAX_LOG_FILE_SIZE',
      DEFAULT_MAX_FILE_SIZE,
    );
  }

  private async initializeLogDirectory(): Promise<void> {
    if (!existsSync(this.logDir)) {
      await mkdir(this.logDir);
    }
  }

  private formatMessage(
    level: string,
    message: string,
    context?: string,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    const resultLog = `${timestamp} ${level} ${contextStr} ${message}\n`;
    console.log(resultLog);
    return resultLog;
  }

  private async getFileSize(filePath: string): Promise<number> {
    try {
      const stats = await stat(filePath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }

  private async getNextFileNumber(baseFilename: string): Promise<number> {
    try {
      const files = await readdir(this.logDir);
      const pattern = new RegExp(`^${baseFilename}\\.(\\d+)\\.log$`);
      const numbers = files
        .map((file) => {
          const match = file.match(pattern);
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter((num) => !isNaN(num));

      return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    } catch (error) {
      return 1;
    }
  }

  private async rotateFile(filename: string): Promise<string> {
    const baseName = filename.split('.')[0];
    const nextNumber = await this.getNextFileNumber(baseName);
    return `${baseName}.${nextNumber}.log`;
  }

  private async writeToFile(filename: string, message: string): Promise<void> {
    const filePath = join(this.logDir, filename);
    const currentSize = await this.getFileSize(filePath);

    if (currentSize >= this.maxFileSize) {
      const newFilename = await this.rotateFile(filename);
      const newFilePath = join(this.logDir, newFilename);
      await appendFile(newFilePath, message);

      if (filename === this.currentErrorFile) {
        this.currentErrorFile = newFilename;
      }
      if (filename === this.currentCombinedFile) {
        this.currentCombinedFile = newFilename;
      }
    } else {
      await appendFile(filePath, message);
    }
  }

  async log(message: string, context?: string): Promise<void> {
    const formattedMessage = this.formatMessage('LOG', message, context);
    await this.writeToFile(this.currentCombinedFile, formattedMessage);
  }

  async error(
    message: string,
    trace?: string,
    context?: string,
  ): Promise<void> {
    const formattedMessage = this.formatMessage('ERROR', message, context);
    await this.writeToFile(this.currentErrorFile, formattedMessage);
    await this.writeToFile(this.currentCombinedFile, formattedMessage);

    if (trace) {
      const traceMessage = this.formatMessage('ERROR', trace, context);
      await this.writeToFile(this.currentErrorFile, traceMessage);
      await this.writeToFile(this.currentCombinedFile, traceMessage);
    }
  }

  async warn(message: string, context?: string): Promise<void> {
    const formattedMessage = this.formatMessage('WARN', message, context);
    await this.writeToFile(this.currentCombinedFile, formattedMessage);
  }

  async debug(message: string, context?: string): Promise<void> {
    const formattedMessage = this.formatMessage('DEBUG', message, context);
    await this.writeToFile(this.currentCombinedFile, formattedMessage);
  }

  async verbose(message: string, context?: string): Promise<void> {
    const formattedMessage = this.formatMessage('VERBOSE', message, context);
    await this.writeToFile(this.currentCombinedFile, formattedMessage);
  }
}
