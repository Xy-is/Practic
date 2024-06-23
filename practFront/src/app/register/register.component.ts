import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;

  constructor(private _snackBar: MatSnackBar, private registerService: RegisterService,private router: Router) {}


  onRegisterClick(): void {
    if (this.email && this.username && this.password) {
      const userData = {
        email: this.email,
        username: this.username,
        password: this.password,
        role: "USER"
      };
      console.log(this.password == this.repeatPassword)
      if (this.password != this.repeatPassword) {
        this._snackBar.open("passwords don't match", "Ok");
      } else {

        this.registerService.registerUser(userData).subscribe(
          (response) => {
            const token = (response as any).jwt;
            console.log(response);
            this.registerService.saveTokenToCookie(token);
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
