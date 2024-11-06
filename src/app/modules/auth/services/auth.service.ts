import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;
  constructor(private readonly http: HttpClient, private readonly cookieService?: CookieService) { }

  register(user: UserModel): Observable<any>{
    return this.http.post(`${this.URL}/auth/signup`, user)
      .pipe(
        tap((response: any) => {
          this.cookieService?.set('token', response.idToken);
        }),
        catchError((error, caught) => {
          return throwError(() => new Error(error.message));
        })
      )
  }
}
