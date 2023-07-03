import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'environment';
import { Response } from '../interfaces/response';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/:id/list`; // Base URL to get the list of users

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
  getUsers(userId: string, filters: any): Observable<User[]> { 
    let httpParams = new HttpParams();
    Object.keys(filters).forEach(key => {
      httpParams = httpParams.set(key, filters[key]);
    });

    return this.http.get<User[]>(`${this.baseUrl.replace(':id', userId)}`, { params: httpParams });
  }


  }