import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ProjectInDepartmentService {
  constructor(private http: HttpClient, private cookieService:CookieService) {
  }

  getDepartmentById(id: number) {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:8080/api/department/${id}`, {headers:headers})
      .pipe(
        catchError(err => {
          console.error("Произошла ошибка", err)
          return throwError(err);
        })
      )
  }
}
