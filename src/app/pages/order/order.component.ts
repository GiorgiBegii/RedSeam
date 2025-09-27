import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-order',
  imports: [HeaderComponent, CartComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

}
