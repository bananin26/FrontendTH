import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType,ChartDataset } from 'chart.js';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-quantity-message-receive-by-user',
  templateUrl: './quantity-message-receive-by-user.component.html',
  styleUrls: ['./quantity-message-receive-by-user.component.css']
})
export class QuantityMessageReceiveByUserComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  role: string = '';
  barChartData: ChartDataset[] = [];
  constructor(private uS: UserService, private loginService: LoginService) { }


  ngOnInit(): void {
    this.uS.getReceive().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.name);
      this.barChartData = [
        {
          data: data.map(item => item.quantityMessage), label: 'Mensajes recibidos',
          backgroundColor:'rgba(173, 216, 230, 0.5)'
        }
      ]

    });
  }
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
