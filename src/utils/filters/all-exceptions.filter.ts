import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { moment } from '../moment';
import { winstonLogger } from '../winston';

interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

interface CustumHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'internal server error';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);
    this.writeErrorLogToFile(errorLog);

    response.status(status).json(errorResponse);
  }

  private getErrorResponse(
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustumHttpExceptionResponse {
    return {
      statusCode: status,
      error: errorMessage,
      path: request.url,
      method: request.method,
      timeStamp: moment().format('YYYY.MM.DD HH:mm:ss'),
    };
  }

  private getErrorLog(
    errorResponse: CustumHttpExceptionResponse,
    request: Request,
    exception: any,
  ): string {
    const { statusCode, error } = errorResponse;
    const { method, url, user } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - Url: ${url}\n\n
    ${JSON.stringify(errorResponse)}\n\n
    ${JSON.stringify(user ?? 'Not signed in')}\n\n
    ${exception instanceof HttpException ? exception.stack : error}\n\n`;
    return errorLog;
  }

  private writeErrorLogToFile(errorLog: string): void {
    winstonLogger.error(errorLog);
  }
}
