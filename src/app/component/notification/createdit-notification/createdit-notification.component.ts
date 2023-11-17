import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Notification } from 'src/app/model/notification';
import { NotificationService } from 'src/app/service/notification.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/service/message.service';
import { DialogConfirmComponent } from '../../user/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-createdit-notification',
  templateUrl: './createdit-notification.component.html',
  styleUrls: ['./createdit-notification.component.css']
})
export class CreateditNotificationComponent {
  form: FormGroup = new FormGroup({});
  notification: Notification = new Notification();
  mensaje: string = '';
  listaUsers:User[]=[]
  listaMessage:Message[]=[]
  idUserSeleccionada1:number=0
  idMessage: number = 0 
  edition: boolean = false;
  id: number = 0;
  view: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'Visto' },
    { value: 'false', viewValue: 'No visto' },
  ];
 
  constructor(
    private nS: NotificationService,
    private uS:UserService,
    private mS:MessageService,
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
      idNotification: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      date: [''],
      viewed: ['', [Validators.required]],
      user: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
    this.mS.list().subscribe((data) => {
      this.listaMessage = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.notification.idNotification = this.form.value.idNotification;
      this.notification.title = this.form.value.title;
      this.notification.description = this.form.value.description;
      this.notification.date = new Date();
      this.notification.viewed = this.form.value.viewed;
      this.notification.user.idUser = this.form.value.user;
      this.notification.message.idMessage = this.form.value.message;
      
     
      this.nS.insert(this.notification).subscribe((data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
        this.openDialog('La notificación se ha registrado satisfactoriamente.');
        this.form.reset();
      });
      this.router.navigate(['/components/Notifications']);
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
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idNotification: new FormControl(data.idNotification),
          title: new FormControl(data.title),
          description: new FormControl(data.description),
          date: new FormControl(data.date),
          viewed: new FormControl(data.viewed),
          user: new FormControl(data.user.idUser),
          message: new FormControl(data.message.idMessage),
        });
      });
    }
  }  
}
