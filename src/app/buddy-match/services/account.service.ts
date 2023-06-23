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

  isLoggedIn$!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
  }

  login(email: string, password: string): Observable<ResponseData<null>> {
    return this.http.post<HttpResponse<null>>(`${environment.baseUrl}/login`, { email, password }).pipe(
      map((response) => {
        this.isLoggedIn$.next(true);
        return { isSuccess: true };
      }),
      catchError((error) => {
        return of({ isSuccess: false });
      })
    );
  }

  register(user: User) {}

  updateProfile(user: UserDetail) {}
}
