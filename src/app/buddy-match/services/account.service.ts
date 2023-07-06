import { Injectable } from '@angular/core';
import { UserDetail } from '../interfaces/user-detail';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userId$ = new BehaviorSubject<string>(window.localStorage.getItem('userId') || '');
  token$ = new BehaviorSubject<string>(window.localStorage.getItem('token') || '');

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<Response>(`${environment.baseUrl}/login`, { email, password }).pipe(
      map((response) => {
        window.localStorage.setItem('userId', response.rows.userId);
        window.localStorage.setItem('token', response.rows.token);
        this.userId$.next(response.rows.userId);
        this.token$.next(response.rows.token);
        
        return response.rows.userId;
      })
    );
  }

  logout() {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('token');
    this.userId$.next('');
    this.token$.next('');
  }

  register(user: User): Observable<string> {
    return this.http.post<Response>(`${environment.baseUrl}/register`, user).pipe(
      map((response) => {
        return response.rows._id;
      })
    );
  }

  updateProfile(user: UserDetail) {}
}
