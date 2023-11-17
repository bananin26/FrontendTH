import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType,ChartDataset } from 'chart.js';
import { ProductService } from 'src/app/service/product.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-total-product-for-user',
  templateUrl: './total-product-for-user.component.html',
  styleUrls: ['./total-product-for-user.component.css']
})
export class TotalProductForUserComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  role: string = '';
  constructor(private pS: ProductService,
    private loginService: LoginService,) { }
  ngOnInit(): void {
    this.pS.getPurchases().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.name);
      this.barChartData = [
        {
          data: data.map(item => item.totalProducts), label: 'Total de Productos',
          backgroundColor:'rgba(173, 216, 230, 0.5)'
        }
      ]

    });
  }

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
