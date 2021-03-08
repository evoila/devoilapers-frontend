import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Notification, NotificationService, NotificationType} from '../../services/notification/notification.service';
import {Injectable} from '@angular/core';
import {DtosHTTPErrorDto} from '../swagger-auto-gen';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  shortErrorMessages: { [id: number]: string; } = {
    401: 'Invalid username or password.',
    0: 'Backend service not available.',
  };


  constructor(private notification: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let shortErrorMessage: string = error.statusText;

          if (error.status in this.shortErrorMessages){
            shortErrorMessage = this.shortErrorMessages[error.status];
          }

          // When the Backend returns an Error with an Error a in the ErrorDto,
          // then the short ErrorMessage will be Replaced with the Status
          if (error.error !== null && error.error.message) {
            let errorDto: DtosHTTPErrorDto = error.error;
            shortErrorMessage = errorDto.message;
          }

          this.notification.add(
            new Notification(
              NotificationType.Danger,
              shortErrorMessage,
              error.message,
            )
          );

          return throwError(error);
        })
      );
  }

}
