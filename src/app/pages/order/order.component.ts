import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CartComponent } from '../../components/cart/cart.component';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [HeaderComponent, CartComponent, FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  cartData: any;

  formData = {
    name: '',
    surname: '',
    email: '',
    address: '',
    zipcode: ''
  };

  constructor(private cartService: CartService) {}

  async ngOnInit() {
    await this.loadCart();
  }

  async loadCart() {
    try {
      const data: any = await firstValueFrom(this.cartService.getCart());
      this.cartData = data;
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  }
}
