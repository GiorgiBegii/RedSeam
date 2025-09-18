import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirmation: string,
  avatar?: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://api.redseam.redberryinternship.ge/api/register';
  private tokenKey = 'readseam_auth_token';

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registerUrl, payload, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

}
