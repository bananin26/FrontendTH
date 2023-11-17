import { Component, HostBinding } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)), // Adjust the duration as needed
    ]),
  ],
})
export class HomeComponent {
  @HostBinding('@fadeInOut') fadeInOut = true;
  backgroundImage = 'url("assets/fondo-home.jpeg")';
  role: string = '';
  usuario: string = '';
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
