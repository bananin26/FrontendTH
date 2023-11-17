import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'takemehome';
  role: string = '';

  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  
  validarRol() {
    if (this.role == 'ADMIN' || this.role == 'CUSTOMER' || this.role == 'TRAVELER') {
      return true;
    } else {
      return false;
    }
  }
}


