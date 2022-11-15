import {
  CallHandler,
  ExecutionContext,
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
