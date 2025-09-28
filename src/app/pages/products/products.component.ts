import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  // Modals
  filterModal = false;
  sortModal = false;

  // Filters
  filterPrice_from?: number;
  filterPrice_to?: number;
  filterValidation?: string;

  // Full products response from API
  products: any;

  // Flags
  filterParamFlag = false;
  sortParamFlag = false;

  // Pagination
  currentPage = 1;
  lastPage = 10; // fallback
  pages: number[] = [];

  constructor(private getProducts: ProductsService, private router: Router) {}

  async ngOnInit() {
    await this.fetchProducts(this.currentPage);
  }

  async fetchProducts(page: number = 1) {
    this.currentPage = page;

    let query = `page=${page}`;

    if (
      this.filterParamFlag &&
      this.filterPrice_from != null &&
      this.filterPrice_to != null
    ) {
      query += `&filter[price_from]=${this.filterPrice_from}&filter[price_to]=${this.filterPrice_to}`;
    }

    if (this.sortParamFlag && this.products?.meta?.currentSort) {
      query += `&sort=${this.products.meta.currentSort}`;
    }

    try {
      const response = await this.getProducts.getProducts(query);
      this.products = response;

      // Cast meta to any to avoid TS errors if interface is missing properties
      this.lastPage = (response.meta as any)?.last_page ?? 10;

      // Create pages array [1, 2, ..., lastPage]
      this.pages = Array.from({ length: this.lastPage }, (_, i) => i + 1);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  }

  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  async goToPage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    await this.fetchProducts(page);
  }

  async sort(sortBy: string) {
    this.sortParamFlag = true;

    if (!this.products) this.products = {};
    if (!this.products.meta) this.products.meta = {};
    this.products.meta.currentSort = sortBy;

    await this.fetchProducts(1);
    this.toggleSortModal();
  }

  async applyFilter() {
    if (
      this.filterPrice_from !== undefined &&
      this.filterPrice_to !== undefined
    ) {
      if (this.filterPrice_from > this.filterPrice_to) {
        this.filterValidation = "From can't be greater than to.";
        return;
      } else {
        this.filterValidation = '';
      }
    }

    if (
      typeof this.filterPrice_from !== 'number' ||
      typeof this.filterPrice_to !== 'number'
    ) {
      this.filterValidation = 'The filter values must be number.';
      return;
    }

    this.filterParamFlag = true;
    await this.fetchProducts(1);
    this.toggleFilterModal();
  }

  toggleFilterModal() {
    this.filterModal = !this.filterModal;
    if (this.sortModal) this.sortModal = false;
  }

  toggleSortModal() {
    this.sortModal = !this.sortModal;
    if (this.filterModal) this.filterModal = false;
  }

  clearFilter() {
    this.filterPrice_from = undefined
    this.filterPrice_to = undefined
  }
}
