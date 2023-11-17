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
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/service/message.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { DialogConfirmComponent } from '../../user/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-createdit-message',
  templateUrl: './createdit-message.component.html',
  styleUrls: ['./createdit-message.component.css'],
})
export class CreateditMessageComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  message: Message = new Message();
  mensaje: string = '';
  listaUsers:User[]=[]
  idUserSeleccionada1:number=0
  idUserSeleccionada2:number=0
  edition: boolean = false;
  id: number = 0;
  
  constructor(
    private mS: MessageService,
    private uS:UserService,
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
      idMessage: [''],
      title: ['', Validators.required],
      content: ['', [Validators.required]],
      userSend: ['', [Validators.required]],
      userReceive: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.message.idMessage = this.form.value.idMessage;
      this.message.title = this.form.value.title;
      this.message.content = this.form.value.content;
      this.message.userSend.idUser = this.form.value.userSend;
      this.message.userReceives.idUser = this.form.value.userReceive;

      this.mS.insert(this.message).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
        this.openDialog('El mensaje se ha registrado satisfactoriamente.');
      });
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  openDialog( message: string): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      height: '200px',
      data: { message },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/components/Messages']); 
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
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idMessage: new FormControl(data.idMessage),
          title: new FormControl(data.title),
          content: new FormControl(data.content),
          userSend: new FormControl(data.userSend.idUser),
          userReceive: new FormControl(data.userReceives.idUser),
        });
      });
    }
  }  
}
