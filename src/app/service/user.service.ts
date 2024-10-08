import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import User from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://crud-server-green.vercel.app";
  //private apiUrl = "http://localhost:3000";
  httpClient = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`)
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`)
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user)
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${id}`, user)
  }

  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/users/${id}`)
  }
}
