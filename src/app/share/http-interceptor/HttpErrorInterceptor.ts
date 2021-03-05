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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notification: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          let shortErrorMessage = error.statusText;

          if (error.status === 401){
            shortErrorMessage = 'Invalid user name or password';
          }

          this.notification.add(
            new Notification(
              NotificationType.Danger,
              shortErrorMessage,
              error.message,
            )
          )

          return throwError(error);
        })
      )
  }

}
