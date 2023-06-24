import { Injectable } from '@angular/core';
import { UserDetail } from '../interfaces/user-detail';
import { User } from '../interfaces/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environment';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { ResponseData } from '../interfaces/responseData';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  email!: string;

  constructor(private http: HttpClient) {}

  checkIfUserIsLoggedIn(): boolean {
    const email = window.localStorage.getItem('email');
    if(email) {
      this.email = email;
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<ResponseData<null>> {
    return this.http.post<HttpResponse<null>>(`${environment.baseUrl}/login`, { email, password }).pipe(
      map(() => {
        window.localStorage.setItem('email', email);
        this.email = email;
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
