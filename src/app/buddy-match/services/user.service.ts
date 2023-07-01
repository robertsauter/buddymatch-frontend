import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environment';
import { Response } from '../interfaces/response';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getUserById(userId: string): Observable<User | null> {
    const token = window.localStorage.getItem('token');
    if(!token) {
      this.accountService.logout();
      return of(null);
    }
    return this.http.get<Response>(
      `${environment.baseUrl}/profile/${userId}`,
      {
        headers: {
          authorization: `Bearer ${ token }`
        }
      }
    ).pipe(
      map((response: Response) => response.rows.user),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(null);
      })
    );
  }

  //Get all users, that match the given filter options. Should get the filters as input parameter
  getUsers() {}
}
