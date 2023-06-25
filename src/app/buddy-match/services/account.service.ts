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

  user!: User;
  token!: string;

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
        this.user = response.rows.user;
        this.token = response.rows.token;
        return { isSuccess: true };
      }),
      catchError(() => {
        return of({ isSuccess: false });
      })
    );
  }

  logout() {
    window.localStorage.removeItem('email');
  }

  register(user: User) {}

  updateProfile(user: UserDetail) {}
}
