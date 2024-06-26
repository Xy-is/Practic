import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../employees/employees.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getDepartment() {
    const token = this.cookieService.get('jwt');
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:8080/api/department', {headers: headers})
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);

        })
      );
  }


  deleteDepartment(id: number) {
    const token = this.cookieService.get('jwt');
    return this.http.delete(`http://localhost:8080/api/department/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }

  createDepartment(currentDepartment: {
    employeeDtos: string;
    name: string;
    id: string;
    managerId: string;
    projectDtos: string
  }) {
    const token = this.cookieService.get('jwt');
    console.log(currentDepartment)
    return this.http.post<Employee>('http://localhost:8080/api/department', currentDepartment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }
}
