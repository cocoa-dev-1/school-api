import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

interface Exception {
  name: string;
  message: string;
}

export class EntityNotFoundException implements Exception {
  public readonly name = 'EntityNotFoundException';
  public readonly message = 'entity not found';
}

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(private errorMessage: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityNotFoundException) {
          throw new NotFoundException(this.errorMessage);
        } else {
          throw error;
        }
      }),
    );
  }
}

export class UserAlreadyExistException implements Exception {
  public readonly name = 'UserAlreadyExistException';
  public readonly message = 'user already exist';
}

@Injectable()
export class AlreadyExistInterceptor implements NestInterceptor {
  constructor(private errorMessage: string) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UserAlreadyExistException) {
          throw new HttpException(this.errorMessage, HttpStatus.BAD_REQUEST);
        } else {
          throw error;
        }
      }),
    );
  }
}
