import { LoginService } from './../../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list-prices-greater-than1000',
  templateUrl: './list-prices-greater-than1000.component.html',
  styleUrls: ['./list-prices-greater-than1000.component.css']
})
export class ListPricesGreaterThan1000Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType ='bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  role: string = '';


  constructor(private pS: ProductService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.pS.getListPrice().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameProduct);
      this.barChartData = [
        {
          data: data.map(item => item.priceProduct), label: 'Precios',
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
