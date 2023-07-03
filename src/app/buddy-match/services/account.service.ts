import { Injectable } from '@angular/core';
import { UserDetail } from '../interfaces/user-detail';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  token!: string;
  userId!: string;

  constructor(private http: HttpClient) {}

  checkIfUserIsLoggedIn(): boolean {
    const userId = window.localStorage.getItem('userId');
    if(userId) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<Response>(`${environment.baseUrl}/login`, { email, password }).pipe(
      map((response) => {
        window.localStorage.setItem('userId', response.rows.userId);
        window.localStorage.setItem('token', response.rows.token);
        this.userId = response.rows.userId;
        this.token = response.rows.token;
        return response.rows.userId;
      })
    );
  }

  logout() {
    window.localStorage.removeItem('userId');
  }

  register(user: User): Observable<string> {
    return this.http.post<Response>(`${environment.baseUrl}/register`, user).pipe(
      map((response) => {
        this.userId = response.rows._id;
        return response.rows._id;
      })
    );
  }

  updateProfile(user: UserDetail) {}
}
