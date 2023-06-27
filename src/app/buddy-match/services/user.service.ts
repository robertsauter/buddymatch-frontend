import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importamos HttpClient y HttpParams
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/:id/list`; // Base URL to get the list of users

  constructor(private http: HttpClient) { } // Inyect HttpClient

  getUserByEmail(email: string) {
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