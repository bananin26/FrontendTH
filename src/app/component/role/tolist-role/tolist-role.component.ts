import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Role } from 'src/app/model/role';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-tolist-role',
  templateUrl: './tolist-role.component.html',
  styleUrls: ['./tolist-role.component.css']
})
export class TolistRoleComponent implements OnInit{
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'role'];
  backgroundImage = 'url("assets/fondo-role.jpg")';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RoleService) {}

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
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
