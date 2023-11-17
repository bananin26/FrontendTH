import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-createdit-role',
  templateUrl: './createdit-role.component.html',
  styleUrls: ['./createdit-role.component.css']
})
export class CreateditRoleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  mensaje: string = '';
  listaUsers:User[]=[]
  idUserSeleccionada1:number=0

  constructor(
    private rS: RoleService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      role: ['', Validators.required],
      user: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.role.id = this.form.value.id;
      this.role.rol = this.form.value.role;
      this.role.user.username = this.form.value.username;

      this.rS.insert(this.role).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['Roles']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
