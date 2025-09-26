import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productId!: string;
  product: any

  constructor(private getProducts: ProductsService, private route: ActivatedRoute) {
    
  }

  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.productId)
    try {
      this.product = await this.getProducts.getProductById(this.productId);
      console.log('Products:', this.product);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  }
}
