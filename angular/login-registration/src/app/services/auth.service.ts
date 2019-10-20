import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private commonUrl = 'http://localhost:4000/api';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private _http: HttpClient) { }

  saveUser(userForm) {
    return this._http.post(`${this.commonUrl}/users`, userForm, {headers: this.headers});
  }

  validateUser(loginForm) {
    return this._http.post(`${this.commonUrl}/auth`, loginForm, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  public handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = err.error;
    }
    console.log(errMsg);
    return throwError(errMsg);
  }
}
