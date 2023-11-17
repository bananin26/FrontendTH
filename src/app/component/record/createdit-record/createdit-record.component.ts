import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Record } from 'src/app/model/record';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { RecordService } from 'src/app/service/record.service';
import * as moment from 'moment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { DialogConfirmComponent } from '../../user/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-createdit-record',
  templateUrl: './createdit-record.component.html',
  styleUrls: ['./createdit-record.component.css'],
})
export class CreateditRecordComponent implements OnInit {
  
  form: FormGroup = new FormGroup({});
  record: Record = new Record();
  mensaje: string = '';
  dueDateOrder = new FormControl(new Date());
  listaProduct: Product[] = [];
  listaCategory: Category[] = [];
  listaUser: User[] = [];
  idProductSeleccionada: number = 0;
  idCategorySeleccionada: number = 0;
  idUserSeleccionada: number = 0;
  edition: boolean = false;
  id: number = 0;
  precioProductoSeleccionado: number = 0;
  payment: { value: string; viewValue: string }[] = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Mastercard', viewValue: 'Mastercard' },
    { value: 'Paypal', viewValue: 'Paypal' },
  ];
  puntos: { value: number; viewValue: number }[] = [
    { value: 10, viewValue: 10 },
    { value: 30, viewValue: 30 },
    { value: 50, viewValue: 50 },
    { value: 100, viewValue: 100 },
    { value: 120, viewValue: 120 },
    { value: 150, viewValue: 150 },
    { value: 200, viewValue: 200 },
  ];
  fechaActual: Date = new Date();
  fechaMaxima: Date = moment(this.fechaActual).add(7, 'days').toDate();
  fechaMaxima2: Date = moment(this.fechaActual).add(14, 'days').toDate();

  constructor(
    private pS: ProductService,
    private cS: CategoryService,
    private rS: RecordService,
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
      idRecord: [''],
      payment: ['', Validators.required],
      paymentDate: ['', [Validators.required]],
      arriveDate: ['', Validators.required],
      points: [''],
      product: ['', Validators.required],
      user: ['', Validators.required],
    });
    this.pS.list().subscribe((data) => {
      this.listaProduct = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCategory = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUser = data;
    });

    this.form.get('product')?.valueChanges.subscribe((idProduct) => {
      const selectedProduct = this.listaProduct.find((p) => p.idProduct === idProduct);
      if (selectedProduct) {
        this.precioProductoSeleccionado = selectedProduct.priceProduct;
        this.asignarPuntosAutomaticamente();
      }
    });
  }
    
  
  accept(): void {
    if (this.form.valid) {
      this.record.idRecord = this.form.value.idRecord;
      this.record.payment = this.form.value.payment;
      this.record.paymentDate = this.form.value.paymentDate;
      this.record.arriveDate = this.form.value.arriveDate;
      this.record.product.idProduct = this.form.value.product;
      this.record.product.priceProduct = this.form.value.priceProduct;
      this.record.user.idUser = this.form.value.user;
      this.record.points = this.form.value.points;

      this.rS.insert(this.record).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
        this.openDialog('El record se ha registrado satisfactoriamente.');
      });
      this.router.navigate(['/components/Records/new']);
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


asignarPuntosAutomaticamente() {
  if (this.precioProductoSeleccionado >= 0 && this.precioProductoSeleccionado <= 100) {
    this.form.patchValue({ points: 10 });
  } else if (this.precioProductoSeleccionado <= 200) {
    this.form.patchValue({ points: 30 });
  } else if (this.precioProductoSeleccionado <= 300) {
    this.form.patchValue({ points: 50 });
  } else if (this.precioProductoSeleccionado <= 400) {
    this.form.patchValue({ points: 100 });
  } else if (this.precioProductoSeleccionado <= 450) {
    this.form.patchValue({ points: 120 });
  } else if (this.precioProductoSeleccionado <= 500) {
    this.form.patchValue({ points: 150 });
  } else {
    this.form.patchValue({ points: 200 });
  }
}

  init() {
    if (this.edition) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idRecord: new FormControl(data.idRecord),
          payment: new FormControl(data.payment),
          paymentDate: new FormControl(data.paymentDate),
          arriveDate: new FormControl(data.arriveDate),
          product: new FormControl(data.product.idProduct),
          user: new FormControl(data.user.idUser),
          points: new FormControl(data.points),
        });
      });
    }
  } 
}
