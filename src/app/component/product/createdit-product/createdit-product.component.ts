import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { Trips } from 'src/app/model/trips';
import { TripsService } from 'src/app/service/trips.service';
import { DialogConfirmComponent } from '../../user/dialog-confirm/dialog-confirm.component';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-createdit-product',
  templateUrl: './createdit-product.component.html',
  styleUrls: ['./createdit-product.component.css']
})
export class CreateditProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  product: Product = new Product();
  mensaje: string = '';
  listaTrips:Trips[]=[]
  listaCategory:Category[]=[]
  listaUser:User[]=[]
  idOrderSeleccionada:number=0
  idUserSeleccionada:number=0
  idCategorySeleccionada:number=0
  edition: boolean = false;
  id: number = 0;
  
 
  constructor(
    private pS: ProductService,
    private cS: CategoryService,
    private tS: TripsService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edition = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idProduct: [''],
      nameProduct: ['', Validators.required],
      descriptionProduct: ['', [Validators.required]],
      priceProduct: ['', Validators.required],
      dimensionsProduct: ['', Validators.required],
      trips: ['', Validators.required],
      category: ['', Validators.required],
      user: ['', Validators.required]
    });
    this.tS.list().subscribe((data) => {
      this.listaTrips = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCategory = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUser = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.product.idProduct = this.form.value.idProduct;
      this.product.nameProduct = this.form.value.nameProduct;
      this.product.descriptionProduct = this.form.value.descriptionProduct;
      this.product.priceProduct = this.form.value.priceProduct;
      this.product.dimensionsProduct = this.form.value.dimensionsProduct;
      this.product.trips.idTrips = this.form.value.trips;
      this.product.category.idCategory = this.form.value.category;
      this.product.user.idUser = this.form.value.user;


      this.pS.insert(this.product).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
        this.openDialog('El producto se ha registrado satisfactoriamente.');
      });
      this.router.navigate(['/components/Products/new']);
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
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idProduct: new FormControl(data.idProduct),
          nameProduct: new FormControl(data.nameProduct),
          descriptionProduct: new FormControl(data.descriptionProduct),
          priceProduct: new FormControl(data.priceProduct),
          dimensionsProduct: new FormControl(data.dimensionsProduct),
          trips: new FormControl(data.trips.idTrips),
          category: new FormControl(data.category.idCategory), 
          user: new FormControl(data.user.idUser), 
        });
      });
    }
  }  
}
