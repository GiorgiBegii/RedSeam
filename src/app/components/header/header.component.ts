import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() authorized: boolean = false

  isCartOpen = false;

  openCart() {
    this.isCartOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeCart() {
    this.isCartOpen = false;
    document.body.classList.remove('no-scroll');
  }
}
