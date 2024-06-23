import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import { FlexLayoutModule } from '@angular/flex-layout';
import {ConfirmDialogComponent} from "./confirm-dialog-component/confirm-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FlexLayoutModule, MatToolbarModule, MatButtonModule, RouterLink, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'asd';
  username: string  | undefined;
  role: string | undefined ;

  constructor(private cookieService: CookieService, public dialog: MatDialog, ) {

  }

  private logout(key: string) {
    document.cookie = `${key}=; expires=Thu, 1 Jan 1990 12:00:00 UTC; path=/`;
  }

  public hasJwtToken(): boolean {
    if(this.cookieService.get('jwt')){
      const token = this.cookieService.get('jwt')
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      this.username = JSON.parse(atob(token.split('.')[1])).sub;
      this.role = JSON.parse(atob(token.split('.')[1])).role;
      return Math.floor((new Date()).getTime() / 1000) <= expiry;
    }
    return false;
  }

  public hasAdmin(): boolean{
    if(this.cookieService.get('jwt')){
      const token = this.cookieService.get('jwt')
      this.role = JSON.parse(atob(token.split('.')[1])).role;
      console.log(this.role == "ADMIN")
      return this.role == "ADMIN";
    }
    return false;
  }



  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Logout', message: 'Are you sure you want to log out from this account?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout('jwt');
      }
    });
  }
}
