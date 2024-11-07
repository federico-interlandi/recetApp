import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/user.model';
import { ErrorNotificationService } from '@shared/services/error-notification.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, pipe, tap, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;
  constructor(private errorNotificationService: ErrorNotificationService, private readonly http: HttpClient, private readonly cookieService?: CookieService) { }

  register(user: UserModel): Observable<any>{
    return this.http.post(`${this.URL}/auth/signup`, user)
      .pipe(
        catchError((error, caught) => {
          this.errorNotificationService.showError('Ocurrio un error al registrar el usuario');
          return throwError(() => new Error(error.message));
        })
      )
  }

  logIn(user: UserModel): Observable<any>{
    return this.http.post(`${this.URL}/auth/login`, user)
      .pipe(
        tap((response: any) => {
          this.cookieService?.set('token', response.idToken);
        }),
        catchError((error, caught) => {
          this.errorNotificationService.showError('Ocurrio un error con tu email o password');
          return throwError(() => new Error(error.message));
        })
      )
  }

  logOut(): void {
    this.cookieService?.delete('token');
  }
}
