import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product, ProductResponse, ProductDetail } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiBaseUrl = 'https://api.redseam.redberryinternship.ge/api/products/';

  constructor(private http: HttpClient) {}

  async getProducts(queryParam: string): Promise<ProductResponse> {
    try {
      const response = await firstValueFrom(
        this.http.get<ProductResponse>(`${this.apiBaseUrl}?${queryParam}`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<ProductDetail> {
    try {
      const response = await firstValueFrom(
        this.http.get<ProductDetail>(`${this.apiBaseUrl}${id}`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }
}
