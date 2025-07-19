import { CustomLogger } from '@app/common';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface ApiResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data: {};
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    if (request?.headers?.origin) {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
      response.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    if (!request) {
      this.logger.warn('Non-HTTP request intercepted');
      return next.handle();
    }

    const method = request.method;
    const url = request.url;
    const headers = request.headers;
    const body = request.body;
    const startTime = Date.now();

    // Log request details
    this.logger.log(`-- ${method} ${url} --`);
    this.logger.log(`Request Headers: ${JSON.stringify(headers, null, 2)}`);
    this.logger.log(`Request Body: ${JSON.stringify(body, null, 2)}`);

    return next.handle().pipe(
      map((response: any) => {
        const executionTime = `${Date.now() - startTime} milliseconds`;
        const filteredData = this.filterResponseData(response?.data);
        const formattedResponse: ApiResponse = {
          success: true,
          message: response?.message || 'Request processed successfully.',
          execution_time: executionTime,
          data: filteredData,
        };

        this.logger.log(
          `Request Response: ${JSON.stringify(formattedResponse, null, 2)}`,
        );
        return formattedResponse;
      }),
      catchError((err) => {
        this.logger.log(err);
        const executionTime = `${Date.now() - startTime} milliseconds`;

        const statusCode = err instanceof HttpException ? err.getStatus() : 500;

        let message: string = '';
        let data: null = null;
        let errors: any[] = [];

        if (typeof err === 'object') {
          message = (err as any).response?.message;
          errors = (err as any).response?.errors || [];
          data = null;
        }

        if (!message) {
          message = (err as any).message;
        }

        const errorDetails = {
          success: false,
          execution_time: executionTime,
          message: message || 'Something went wrong. Please try again later.',
          data,
          errors,
        };

        this.logger.error(
          `Error in ${method} ${url} | Execution Time: ${executionTime}`,
          JSON.stringify(errorDetails, null, 2),
        );

        throw new HttpException(errorDetails, statusCode);
      }),
    );
  }

  /**
   * Filters out unwanted attributes from response data recursively.
   */
  private filterResponseData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.filterAttributes(item));
    }
    if (typeof data === 'object' && data !== null) {
      return this.filterAttributes(data);
    }
    return data;
  }

  /**
   * Removes specified attributes from an object.
   */
  private filterAttributes(data: any): any {
    const excludedAttributes = [
      'updated_at',
      'is_deleted',
      'created_by',
      'updated_by',
      'deleted_by',
      'password',
      'approved_at',
      'secret',
      'mobile_token',
      'web_token',
    ];

    // Check if the data is a Date object
    if (data instanceof Date) {
      return this.convertDateToUnixTimestamp(data);
    }

    if (typeof data === 'object' && data !== null) {
      return Object.keys(data)
        .filter((key) => !excludedAttributes.includes(key))
        .reduce((acc, key) => {
          acc[key] = this.filterResponseData(data[key]);
          return acc;
        }, {});
    }
    return data;
  }

  /**
   * Converts a Date object to a UNIX timestamp in seconds.
   */
  private convertDateToUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }
}
