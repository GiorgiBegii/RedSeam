import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  subtotalPrice: number = 0;
  total: number = 0;
  delivery: number = 5;

  @Input() nextStage: string = ""
  @Input() nextStageRoute: string = ""

  cartData: any[] = []; 

  constructor(private cartService: CartService) {}

  async ngOnInit() {
    await this.loadCart();
    this.recalculateTotals();
  }

  async loadCart() {
    try {
      const data: any = await firstValueFrom(this.cartService.getCart());
      this.cartData = data;
      console.log('Cart data:', this.cartData);
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  }

  recalculateTotals() {
    this.subtotalPrice = 0;
    for (let i = 0; i < this.cartData.length; i++) {
      this.subtotalPrice += this.cartData[i].price * this.cartData[i].quantity;
    }
    this.total = this.subtotalPrice + this.delivery;
  }

  incrementQwt(index: number) {
    this.cartData[index].quantity += 1;
    this.recalculateTotals();
  }

  decrementQwt(index: number) {
    if (this.cartData[index].quantity > 1) {
      this.cartData[index].quantity -= 1;
      this.recalculateTotals();
    }
  }

  removeProduct(id: number) {
    this.cartService.removeProductFromCart(id).subscribe({
      next: async () => {
        console.log('Product removed from cart');
        await this.loadCart();
        this.recalculateTotals();
      },
      error: (err) => console.error('Error removing product', err)
    });
  }
}
