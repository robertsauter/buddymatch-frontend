import { Injectable } from '@angular/core';
import { UserDetail } from '../interfaces/user-detail';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { Observable, catchError, map, of } from 'rxjs';
import { ResponseData } from '../interfaces/responseData';
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

  login(email: string, password: string): Observable<ResponseData<null>> {
    return this.http.post<Response>(`${environment.baseUrl}/login`, { email, password }).pipe(
      map((response) => {
        window.localStorage.setItem('email', email);
        this.userId = response.rows.userId;
        this.token = response.rows.token;
        return { isSuccess: true };
      }),
      catchError((e) => {
        console.log(e);
        return of({ isSuccess: false })
      })
    );
  }

  logout() {
    window.localStorage.removeItem('email');
  }

  register(user: User): Observable<ResponseData<null>> {
    return this.http.post<Response>(`${environment.baseUrl}/register`, user).pipe(
      map((response) => {
        this.userId = response.rows._id;
        return { isSuccess: true };
      }),
      catchError(() => of({ isSuccess: false }))
    );
  }

  updateProfile(user: UserDetail) {}
}
