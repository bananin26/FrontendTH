import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Trips } from 'src/app/model/trips';
import { TripsService } from 'src/app/service/trips.service';

@Component({
  selector: 'app-tolist-trips',
  templateUrl: './tolist-trips.component.html',
  styleUrls: ['./tolist-trips.component.css']
})
export class TolistTripsComponent {
  dataSource: MatTableDataSource<Trips> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idTrips',
    'shippingDate',
    'arriveDate',
    'destinationCountry',
    'destinationCity',
    'destinationAddress',
    'originCountry',
    'originCity',
    'user',
    'actualizar',
    'eliminar'
  ];
  backgroundImage = 'url("assets/trips.jpg")';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TripsService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
