import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';
import { CreateditUserComponent } from './createdit-user/createdit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  role: string = '';
  constructor(
    public route: ActivatedRoute,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (
      this.role == 'ADMIN' ||
      this.role == 'CUSTOMER' ||
      this.role == 'TRAVELER'
    ) {
      return true;
    } else {
      return false;
    }
  }


}
