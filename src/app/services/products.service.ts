import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apBaseiUrl = 'https://api.redseam.redberryinternship.ge/api/products/?';

  constructor(private http: HttpClient) { }



  async getProducts(queryParam: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<any>(`${this.apBaseiUrl}${queryParam}`));
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; 
    }
  }


}
