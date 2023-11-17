import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { DialogConfirmComponent } from '../../user/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-createdit-category',
  templateUrl: './createdit-category.component.html',
  styleUrls: ['./createdit-category.component.css']
})
export class CreateditCategoryComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  category: Category = new Category();
  mensaje: string = '';
  edition: boolean = false;
  id: number = 0;
 
  constructor(
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edition = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idCategory: [''],
      nameCategory: ['', Validators.required],
      detailsCategory: ['', [Validators.required]],
    });
  }

  accept(): void {

    if (this.form.valid) {
      this.category.idCategory = this.form.value.idCategory;
      this.category.nameCategory = this.form.value.nameCategory;
      this.category.detailsCategory = this.form.value.detailsCategory;
     
      this.cS.insert(this.category).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        this.openDialog('La categoria se ha registrado satisfactoriamente.');
      });
      
      this.router.navigate(['/components/Categories/new']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      height: '200px',
      data: { message },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.form.reset();
    });
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edition) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCategory: new FormControl(data.idCategory),
          nameCategory: new FormControl(data.nameCategory),
          detailsCategory: new FormControl(data.detailsCategory),
        });
      });
    }
  }  
}
