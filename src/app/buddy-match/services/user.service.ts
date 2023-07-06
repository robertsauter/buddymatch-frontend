import { Injectable } from '@angular/core';
import { Observable, catchError, first, map, of } from 'rxjs';
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

  getMatches(userId: string): Observable<Observable<User | null>[] | null> {
    const token = window.localStorage.getItem('token');
    if(!token) {
      this.accountService.logout();
    }

    return this.http.get<Response>(
      `${environment.baseUrl}/match/acceptor/${userId}/list`,
      {
        headers: {
          authorization: `Bearer ${ token }`
        }
      }
    ).pipe(
      map((response) => {
        const users: Observable<User | null>[] = [];

        //Add match interface later to use here
        response.rows.forEach((match: any) => {
          if(!match.accepted) {
            users.push(this.getUserById(match.sender));
          }
        });
        return users;
      }),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(null);
      })
    );
  }

  accept(acceptor: string, sender: string): Observable<boolean> {
    const token = window.localStorage.getItem('token');
    if(!token) {
      this.accountService.logout();
    }

    return this.http.post<Response>(
      `${environment.baseUrl}/match/${acceptor}/accept/${sender}`,
      {},
      {
        headers: {
          authorization: `Bearer ${ token }`
        }
      }
    ).pipe(
      map((response) => true),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(false);
      })
    );
  }

  //Get all users, that match the given filter options. Should get the filters as input parameter
  getUsers() {}
}
