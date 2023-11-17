import { Component } from '@angular/core';

@Component({
  selector: 'app-mapachevere',
  templateUrl: './mapachevere.component.html',
  styleUrls: ['./mapachevere.component.css']
})
export class MapachevereComponent {

  position = {
    lat:-12.10417,     
    lng:-76.96341
  };

  label={
    color:'red',
    text:'.'
  }
}
