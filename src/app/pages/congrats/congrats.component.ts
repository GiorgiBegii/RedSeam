import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-congrats',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './congrats.component.html',
  styleUrl: './congrats.component.css'
})
export class CongratsComponent {

}
