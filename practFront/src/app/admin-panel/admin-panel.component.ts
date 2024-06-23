import { Component } from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {DepartmentService} from "../departments/department.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AdminPanelService} from "./admin-panel.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ConfirmDialogComponent} from "../confirm-dialog-component/confirm-dialog-component.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatTableModule, MatSelect, FormsModule, MatOption, MatIcon, MatIconButton],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  users: any[] = [];
  dataSource:any = this.users;

  constructor(private adminPanelService: AdminPanelService, public dialog: MatDialog) {
    this.users = [];
  }

  ngOnInit() {
    this.updateUsers();

  }

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'delete', 'upd'];

  private updateUsers() {
    this.adminPanelService.getUsers().subscribe(data => {
      // @ts-ignore
      this.users = data;
      this.dataSource = this.users;
      console.log(this.dataSource)
    });
  }

  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this user?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  private deleteUser(id: number) {
    this.adminPanelService.deleteUser(id).subscribe((response) => {
        this.updateUsers();
      },
      (error) => {

        console.error('Ошибка при удалении сотрудника:', error);
      }
    );
  }

  openUpdDialog(id:number, role:string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this user?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.UpdUserInDB(id, role);
      }
    });
  }

  private UpdUserInDB(id: number, role:string) {
    this.adminPanelService.updateUser(id, role).subscribe((response) => {
        this.updateUsers();
      },
      (error) => {

        console.error('Ошибка при удалении сотрудника:', error);
      }
    );
  }
}
