import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType,ChartDataset } from 'chart.js';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-quantity-message-send-by-user',
  templateUrl: './quantity-message-send-by-user.component.html',
  styleUrls: ['./quantity-message-send-by-user.component.css']
})
export class QuantityMessageSendByUserComponent {
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
    this.uS.getSend().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.name);
      this.barChartData = [
        {
          data: data.map(item => item.quantityMessageSend), label: 'Mensajes Enviados',
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
