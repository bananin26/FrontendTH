import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tolist-user',
  templateUrl: './tolist-user.component.html',
  styleUrls: ['./tolist-user.component.css'],
})
export class TolistUserComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idUser',
    'name',
    'email',
    'phone',
    'birthday',
    'country',
    'actualizar',
    'eliminar',
  ];
  backgroundImage = 'url("assets/fondo-general.jpg")';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UserService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }

}
