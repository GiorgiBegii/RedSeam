import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/auth.model'; // Import the interface defining the registration payload

/**
 * AuthService handles all authentication-related API calls
 * such as register, login, and token storage/retrieval.
 */
@Injectable({
  providedIn: 'root' // This service will be singleton and available throughout the app
})
export class AuthService {
  /**
   * Base URL for your backend API.
   * All auth-related endpoints will be built from this URL.
   */
  private apBaseiUrl = 'https://api.redseam.redberryinternship.ge/api';

  /**
   * Key name used for storing the auth token in the browser's localStorage.
   */
  private tokenKey = 'readseam_auth_token';

  /**
   * Inject Angular HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends a registration request to the backend API.
   * param payload - An object implementing RegisterRequest containing user registration info.
   * returns Observable<any> - Emits the server's response once available.
   */
  register(payload: RegisterRequest): Observable<any> {
    // Prepare JSON headers for the request.
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make POST request to /register endpoint with payload.
    return this.http.post<any>(`${this.apBaseiUrl}/register`, payload, { headers });
  }

  /**
   * Logs in the user by sending email and password to the backend API.
   * param payload - Object containing email and password.
   * returns Observable<any> - Emits the server's response (including token, etc.).
   */
  login(payload: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make POST request to /login endpoint with credentials.
    return this.http.post<any>(`${this.apBaseiUrl}/login`, payload, { headers });
  }

  /**
   * Stores the JWT/authentication token in the browser's localStorage.
   * param token - The authentication token string.
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves the authentication token from the browser's localStorage.
   * returns string | null - The token string if present, otherwise null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Removes the authentication token from localStorage.
   * This effectively logs the user out on the client side.
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
