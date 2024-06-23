import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getUsers() {
    const token = this.cookieService.get('jwt');
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:8080/api/auth/get', {headers: headers})
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);

        })
      );
  }

  deleteUser(id: number) {
    const token = this.cookieService.get('jwt');
    return this.http.delete(`http://localhost:8080/api/auth/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }

  updateUser(id: number, role: string) {
    const token = this.cookieService.get('jwt');

    return this.http.put(`http://localhost:8080/api/auth/update/${id}`, role, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }
}
