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
    const email = window.localStorage.getItem('email');
    if(email) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<Response>(`${environment.baseUrl}/login`, { email, password }).pipe(
      map((response) => {
        window.localStorage.setItem('email', email);
        this.userId = response.rows.userId;
        this.token = response.rows.token;
        return response.rows.userId;
      })
    );
  }

  logout() {
    window.localStorage.removeItem('email');
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
