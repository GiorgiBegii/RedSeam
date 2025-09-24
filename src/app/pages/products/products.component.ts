import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  filterModal = false
  sortModal = false

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
