import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService} from '../../services/notification/notification.service';
import { Injectable} from '@angular/core';
import { DtosHTTPErrorDto} from '../swagger-auto-gen';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  shortErrorMessages: { [id: number]: string; } = {
    401: 'Invalid username or password.',
    0: 'Backend service not available.',
  };


  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let shortErrorMessage: string = 'Error Code: ' + String(error.status);
          let longErrorMessage: string = shortErrorMessage + ' ';

          if (error.status in this.shortErrorMessages){
            shortErrorMessage = this.shortErrorMessages[error.status];
          }

          // When the Backend returns an Error with an Error a in the ErrorDto,
          // then the short ErrorMessage will be Replaced with the Status
          if (error.error !== null && error.error.message) {
            const errorDto: DtosHTTPErrorDto = error.error;
            shortErrorMessage = errorDto.message;
            longErrorMessage = longErrorMessage + errorDto.message;
          }

          // this.notificationService.use
          this.notificationService.addError(
            new Notification(
              NotificationType.Danger,
              shortErrorMessage,
              longErrorMessage,
            )
          );

          return throwError(error);
        }),

      );
  }

}
