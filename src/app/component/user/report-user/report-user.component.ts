import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  fechaForm: FormGroup = new FormGroup({});
  mensaje: string = '';
  fechaVacia: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  displayedColumns: string[] = [
    'idUser',
    'name',
    'email',
    'phone',
    'birthday',
    'country',
  ];
  backgroundImage = 'url("assets/fondo-general.jpg")';

  constructor(private pS: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fechaForm = this.formBuilder.group({
      fecha: [null, Validators.required],
    });
  }

 
  buscar() {
    if (this.fechaForm.valid) {
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0, 10);
      this.pS.search(fechas).subscribe((data) => {        
        this.dataSource.data = data;       
        if (data.length === 0) {
          this.mensaje = "No se encontraron resultados para la fecha seleccionada.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.fechaForm.get('fecha')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese una fecha.';
      }
    }
}

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.fechaForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
