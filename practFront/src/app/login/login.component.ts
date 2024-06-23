import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterService} from "../register/register.service";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;


  constructor(private _snackBar: MatSnackBar,private router: Router, private loginService: LoginService) {}


  onRegisterClick(): void {
    if (this.email && this.password) {
      const userData = {
        email: this.email,
        //username: this.username,
        password: this.password,
        //role: "ADMIN"
      };
      console.log(this.password == this.repeatPassword)
      if (this.password != this.repeatPassword) {
        this._snackBar.open("passwords don't match", "Ok");
      } else {

        this.loginService.loginUser(userData).subscribe(
          (response) => {
            const token = (response as any).jwt; // Получение токена
            console.log(response);
            this.loginService.saveTokenToCookie(token);
              this.router.navigate(['/employees']);

          },
          (error) => {
            console.error('Ошибка при регистрации:', error);
          }
        );
      }
    }
  }
}
