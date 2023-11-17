import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-tolist-category',
  templateUrl: './tolist-category.component.html',
  styleUrls: ['./tolist-category.component.css']
})
export class TolistCategoryComponent {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns: string[] = ['idCategory', 'nameCategory','detailsCategory','actualizar','eliminar'];
  backgroundImage = 'url("assets/fondo-category.jpg")';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CategoryService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
