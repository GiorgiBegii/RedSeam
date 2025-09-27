import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddProductToCartRequest } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiBaseUrl = 'https://api.redseam.redberryinternship.ge/api';

  constructor(private http: HttpClient) { }


  addProductToCart(productId: string, cartData: AddProductToCartRequest): Observable<AddProductToCartRequest> {
    console.log("data: " + cartData)
    const token = localStorage.getItem('readseam_auth_token'); 
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiBaseUrl}/cart/products/${productId}`;
    return this.http.post<AddProductToCartRequest>(url, cartData, { headers });
  }


  getCart(): Observable<any> {
    const token = localStorage.getItem('readseam_auth_token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiBaseUrl}/cart`;
    return this.http.get(url, { headers });
  }

  removeProductFromCart(productId: number): Observable<any> {
    const token = localStorage.getItem('readseam_auth_token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiBaseUrl}/cart/products/${productId}`;
    return this.http.delete(url, { headers });
  }

}
