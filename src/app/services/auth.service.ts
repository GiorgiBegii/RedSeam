import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/auth.model';


@Injectable({
  providedIn: 'root' // Makes the service available application-wide without needing to register it in providers[]
})
export class AuthService {
  // API endpoint for registering a new user
  private registerUrl = 'https://api.redseam.redberryinternship.ge/api/register';
  // Key under which the token will be stored in localStorage
  private tokenKey = 'readseam_auth_token';

  constructor(private http: HttpClient) {} // Inject Angular's HttpClient for HTTP requests

  /**
   * Registers a new user by sending a POST request to the backend API.
   * param payload The registration data that matches RegisterRequest interface.
   * returns Observable with the server response.
   */
  register(payload: RegisterRequest): Observable<any> {
    // Set headers for the request. By default, sending JSON.
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registerUrl, payload, { headers });
  }

  /**
   * Saves the authentication token in the browser's localStorage.
   * @param token The JWT or auth token received from the server.
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves the authentication token from localStorage.
   * returns The token string or null if not present.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Removes the authentication token from localStorage.
   * This is typically called when logging out the user.
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
