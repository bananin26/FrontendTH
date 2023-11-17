import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  role: string = '';

  constructor(public route: ActivatedRoute,private loginService: LoginService){}
  ngOnInit(): void{}
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  cerrar() {
    sessionStorage.clear();
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
