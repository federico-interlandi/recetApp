import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorNotificationService } from '@shared/services/error-notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorNotificationService: ErrorNotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorNotificationService.showError(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
