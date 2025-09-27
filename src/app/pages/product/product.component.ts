import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../models/products.model';
import { CartService } from '../../services/cart.service';
import { AddProductToCartRequest } from '../../models/cart.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId!: string;
  product!: ProductDetail;

  mainImage: string = ""

  cartObject: AddProductToCartRequest  = {
    color: "",
    quantity: 1,
    size: ""
  }

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    
    try {
      this.product = await this.productsService.getProductById(this.productId);
      console.log('Product:', this.product);
      this.mainImage = this.product.cover_image
      this.cartObject.color = this.product.available_colors[0];
      this.cartObject.size = this.product.available_sizes[0];

    } catch (error) {
      console.error('Failed to load product:', error);
    }

  }

  mainImgChanger(img: string) {
    this.mainImage = img
  }

  selectColor(color: string) {
    this.cartObject.color = color;
  }

  selectSize(size: string) {
    this.cartObject.size = size;
  }

  selectQuantity(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.cartObject.quantity = Number(selectElement.value);
  }

  addToCart() {
    this.cartService.addProductToCart(this.productId, this.cartObject).subscribe({
      next: (response) => {
        console.log('Added to cart successfully:', response);
        // Optionally show some success UI feedback here
      },
      error: (error) => {
        console.error('Failed to add to cart:', error);
        // Optionally show an error message to the user
      }
    });
  }

}
