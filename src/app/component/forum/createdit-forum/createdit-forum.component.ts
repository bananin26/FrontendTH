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
import { Forum } from 'src/app/model/forum';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ForumService } from 'src/app/service/forum.service';
import { DialogConfirmComponent } from '../../user/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-createdit-forum',
  templateUrl: './createdit-forum.component.html',
  styleUrls: ['./createdit-forum.component.css']
})
export class CreateditForumComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  forum: Forum = new Forum();
  mensaje: string = '';
  dueDateOrder = new FormControl(new Date());
  listaUsers:User[]=[]
  idUserSeleccionada:number=0
  edition: boolean = false;
  id: number = 0;
 
  constructor(
    private fS: ForumService,
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
      idForum: [''],
      forum: ['', Validators.required],
      date: [''],
      user: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.forum.idForum = this.form.value.idForum;
      this.forum.forum = this.form.value.forum;
      this.forum.date = new Date();
      this.forum.user.idUser = this.form.value.user;
     
      this.fS.insert(this.forum).subscribe((data) => {
        this.fS.list().subscribe((data) => {
          this.fS.setList(data);
        });
        this.openDialog('El forum se ha registrado satisfactoriamente.');
      });
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
      this.router.navigate(['/components/Forums']);
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
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idForum: new FormControl(data.idForum),
          forum: new FormControl(data.forum),
          date: new FormControl(data.date),
          user: new FormControl(data.user.idUser)
        });
      });
    }
  } 
}
