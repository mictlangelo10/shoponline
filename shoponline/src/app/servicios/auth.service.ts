import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(usuario: User) {
    return this.http.post(`${this.baseUrl}/users`, usuario);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  // Método para actualizar el estado de autenticación
  setAuthStatus(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
