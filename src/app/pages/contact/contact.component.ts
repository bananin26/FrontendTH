import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  position = {
    lat:-12.10417,     
    lng:-76.96341
  };

  label={
    color:'red',
    text:'.'
  }
}
