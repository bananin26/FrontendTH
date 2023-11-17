import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Record } from 'src/app/model/record';
import { RecordService } from 'src/app/service/record.service';



@Component({
  selector: 'app-tolist-record',
  templateUrl: './tolist-record.component.html',
  styleUrls: ['./tolist-record.component.css']
})
export class TolistRecordComponent implements OnInit{
  dataSource: MatTableDataSource<Record> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idRecord',
    'payment',
    'paymentDate',
    'arriveDate',
    'points',
    'product',
    'user',
    'actualizar',
    'eliminar'
  ];
  backgroundImage = 'url("assets/fondo-record.jpg")';


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RecordService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
