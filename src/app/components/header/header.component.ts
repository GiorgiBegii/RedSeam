import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() authorized: boolean = true

  isCartOpen = false;
  cartData: any;
  cartItems: number = 0

  constructor(private cartService: CartService, private authService: AuthService) {}

  async ngOnInit() {
    await this.loadCart()
    this.cartItems = this.cartData.length
    if(this.authService.getToken()){
      this.authorized = false
    }
  }

  updateCartItems(updatedCart: any[]) {
    this.cartData = updatedCart;
    this.cartItems = updatedCart.length;
  }

  async loadCart() {
    try {
      const data: any = await firstValueFrom(this.cartService.getCart());
      this.cartData = data;
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  }

  openCart() {
    this.isCartOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeCart() {
    this.isCartOpen = false;
    document.body.classList.remove('no-scroll');
  }
}
