import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType,ChartDataset } from 'chart.js';
import { LoginService } from 'src/app/service/login.service';
import { RecordService } from 'src/app/service/record.service';

@Component({
  selector: 'app-points-by-user',
  templateUrl: './points-by-user.component.html',
  styleUrls: ['./points-by-user.component.css']
})
export class PointsByUserComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  role: string = '';
  barChartData: ChartDataset[] = [];
  constructor(private rS: RecordService, private loginService: LoginService) { }


  ngOnInit(): void {
    this.rS.getPoints().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.name);
      this.barChartData = [
        {
          data: data.map(item => item.points), label: 'Total Puntos por persona',
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
