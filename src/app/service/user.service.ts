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
  httpClient = inject(HttpClient);

  private httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate', 
      'Pragma': 'no-cache', 
      'Expires': '0'
    })
  };

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${id}`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/users/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
