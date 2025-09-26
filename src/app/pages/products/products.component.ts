import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [HeaderComponent, ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  filterModal = false
  filterPrice_from?: number
  filterPrice_to?: number
  filterValidation?: string
  sortModal = false
  products: any

  filterParamFlag: boolean = false
  sortParamFlag: boolean = false
  param: string = ""


  constructor (private getProducts: ProductsService, private router: Router) {

  }

  async ngOnInit() {
    try {
      this.products = await this.getProducts.getProducts("");
      console.log('Products:', this.products);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  }

  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  async sort(sortBy: string) {
    // Save sort value
    this.sortParamFlag = true;
    const sortParam = `sort=${sortBy}`;

    // Build combined param string fresh
    let query = '';

    if (this.filterParamFlag && this.filterPrice_from != null && this.filterPrice_to != null) {
      query += `filter[price_from]=${this.filterPrice_from}&filter[price_to]=${this.filterPrice_to}`;
    }

    if (query) {
      query += `&${sortParam}`;
    } else {
      query += sortParam;
    }

    try {
      this.products = await this.getProducts.getProducts(query);
      console.log('Products:', this.products);
    } catch (error) {
      console.error('Failed to load products', error);
    }

    this.toggleSortModal();
  }

  async applyFilter() {
    if (this.filterPrice_from != undefined && this.filterPrice_to != undefined) {
      if (this.filterPrice_from > this.filterPrice_to) {
        this.filterValidation = "From can't be greater than to.";
        return;
      } else {
        this.filterValidation = "";
      }
    }

    if (typeof this.filterPrice_from !== 'number' || typeof this.filterPrice_to !== 'number') {
      this.filterValidation = "The filter values must be number.";
      return;
    }

    this.filterParamFlag = true;

    // Build combined param string fresh
    let query = `filter[price_from]=${this.filterPrice_from}&filter[price_to]=${this.filterPrice_to}`;

    if (this.sortParamFlag) {
      // if sort already chosen add it
      query += `&sort=${this.products?.currentSort ?? 'created_at'}`;
    }

    try {
      this.products = await this.getProducts.getProducts(query);
      console.log('Products:', this.products);
    } catch (error) {
      console.error('Failed to load products', error);
    }

    this.toggleFilterModal();
  }

  toggleFilterModal() {
    this.filterModal = !this.filterModal
    if(this.sortModal === true){
      this.sortModal = !this.sortModal
    }
  }

  toggleSortModal() {
    this.sortModal = !this.sortModal
    if(this.filterModal === true){
      this.filterModal = !this.filterModal
    }
  }
}
