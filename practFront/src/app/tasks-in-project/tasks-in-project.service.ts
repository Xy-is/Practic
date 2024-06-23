import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TasksInProjectService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getProjectById(id: number) {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:8080/api/project/getbyid/${id}`, {headers: headers})
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }
}
