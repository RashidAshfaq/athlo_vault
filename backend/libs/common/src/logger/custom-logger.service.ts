import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import 'winston-daily-rotate-file';

@Injectable({ scope: Scope.DEFAULT })
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          level: 'debug',
          dirname: path.join(appRoot.path, 'logs'),
          filename: '%DATE%-app.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '5m',
          maxFiles: '10d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${timestamp} | ${level.toUpperCase()} | ${message}`;
            }),
          ),
        }),
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${timestamp} | ${level.toUpperCase()} | ${message}`;
            }),
          ),
        }),
      ],
      exitOnError: false,
    });
  }

  log(message: string, executionTime?: string) {
    const callerInfo = this.getCallerInfo();
    const clickableLink = `${path.resolve(appRoot.path, callerInfo.file)}:${callerInfo.line}`;
    const logMessage = executionTime
      ? `(${clickableLink}) | ${message} | Execution Time: ${executionTime}`
      : `(${clickableLink}) | ${message}`;
    this.logger.info(logMessage);
  }

  error(message: string, trace?: string) {
    const callerInfo = this.getCallerInfo();
    const clickableLink = `${path.resolve(appRoot.path, callerInfo.file)}:${callerInfo.line}`;
    this.logger.error(`(${clickableLink}) | ${message} | Trace: ${trace}`);
  }

  warn(message: string) {
    const callerInfo = this.getCallerInfo();
    const clickableLink = `${path.resolve(appRoot.path, callerInfo.file)}:${callerInfo.line}`;
    this.logger.warn(`(${clickableLink}) | ${message}`);
  }

  debug(message: string) {
    const callerInfo = this.getCallerInfo();
    const clickableLink = `${path.resolve(appRoot.path, callerInfo.file)}:${callerInfo.line}`;
    this.logger.debug(`(${clickableLink}) | ${message}`);
  }

  verbose(message: string) {
    const callerInfo = this.getCallerInfo();
    const clickableLink = `${path.resolve(appRoot.path, callerInfo.file)}:${callerInfo.line}`;
    this.logger.verbose(`(${clickableLink}) | ${message}`);
  }

  private getCallerInfo(): { file: string; line: number } {
    const obj: any = {};
    Error.captureStackTrace(obj, this.getCallerInfo);
    const stack = obj.stack as string;
    if (!stack) {
      return { file: 'unknown', line: 0 };
    }

    const stackLines = stack.split('\n').slice(2);
    for (const line of stackLines) {
      if (
        !line.includes('node_modules') &&
        !line.includes('custom-logger.service.ts') &&
        !line.startsWith('node:')
      ) {
        const match = line.match(/\((.*):(\d+):(\d+)\)/);
        if (match) {
          const filePath = match[1];
          const lineNumber = parseInt(match[2], 10);
          return {
            file: path.relative(appRoot.path, filePath),
            line: lineNumber,
          };
        } else {
          const match2 = line.match(/at\s+(.*):(\d+):(\d+)/);
          if (match2) {
            const filePath = match2[1];
            const lineNumber = parseInt(match2[2], 10);
            return {
              file: path.relative(appRoot.path, filePath),
              line: lineNumber,
            };
          }
        }
      }
    }

    return { file: 'unknown', line: 0 };
  }
}
