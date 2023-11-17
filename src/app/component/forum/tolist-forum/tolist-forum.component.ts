import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Forum } from 'src/app/model/forum';
import { ForumService } from 'src/app/service/forum.service';

@Component({
  selector: 'app-tolist-forum',
  templateUrl: './tolist-forum.component.html',
  styleUrls: ['./tolist-forum.component.css']
})
export class TolistForumComponent implements OnInit{
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idForum',
    'forum',
    'date',
    'user',
    'actualizar',
    'eliminar'
  ];
  backgroundImage = 'url("assets/fondo-forum.jpg")';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fS: ForumService) {}

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.fS.delete(id).subscribe((data) => {
      this.fS.list().subscribe((data) => {
        this.fS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
