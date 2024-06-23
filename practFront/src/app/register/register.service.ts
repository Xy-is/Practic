import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";

export interface UserData {
  email: string;
  username: string;
  password: string;
  "role": string
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,   private cookieService: CookieService){}

  registerUser(user : UserData) {
    console.log(user)
    return this.http.post('http://localhost:8080/api/auth/register', user)
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }

  saveTokenToCookie(token: string) {
    this.cookieService.set('jwt', token);
  }
}
