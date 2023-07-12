import { Injectable } from '@angular/core';
import { Observable, catchError, first, filter, map, of } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'environment';
import { Response } from '../interfaces/response';
import { AccountService } from './account.service';
import { Match } from '../interfaces/match';
import { UserDetail } from '../interfaces/user-detail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/:id/list`; // Base URL to get the list of users
  //baseUrl/userId/list/?study_program=Program1,Program2&

  constructor(private http: HttpClient, private accountService: AccountService) { }

  // Send call to backend, to update the user information
  updateUser(userId: string, detail: UserDetail): Observable<User | null> {
    return this.http.post<Response>(
      `${environment.baseUrl}/profile/${userId}`,
      { userId, detail }
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

  getUserById(userId: string): Observable<User | null> {
    return this.http.get<Response>(`${environment.baseUrl}/profile/${userId}`).pipe(
      map((response: Response) => response.rows.user),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(null);
      })
    );
  }

  // Fetches all the matches, that a user got
  getMatches(userId: string): Observable<Observable<User | null>[] | null> {
    return this.http.get<Response>(`${environment.baseUrl}/match/acceptor/${userId}/list`).pipe(
      map((response) => {
        const users: Observable<User | null>[] = [];

        // Since the matches objects do not contain the usernames, we have to make additional calls to the backend, to get the users, who sent the matches
        response.rows.forEach((match: Match) => {
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

  accept(acceptor: string, sender: string): Observable<string | null> {
    return this.http.post<Response>(
      `${environment.baseUrl}/match/${acceptor}/accept/${sender}`,
      {}
    ).pipe(
      map((response) => response.rows.chat_id),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(null);
      })
    );
  }

  match(sender: string, acceptor: string): Observable<boolean> {
    return this.http.post(
      `${environment.baseUrl}/match`,
      { sender, acceptor }
    ).pipe(
      map(response => true),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(false);
      })
    );
  }

  //Get all users, that match the given filter options. Should get the filters as input parameter
  getUsers(
    userId: string,
    filters: {
      studyPrograms: string[],
      courses: string[],
      skills: string[]
    } = {
      studyPrograms: [],
      courses: [],
      skills: []
    }
  ): Observable<User[]> {
    
    let httpParams = new HttpParams();

  
    //Adds all the study programs in one string separated by ,
    if(filters.studyPrograms.length > 0){
      httpParams = httpParams.set('study_program', filters.studyPrograms.join(','));
    }
    //Adds all the courses in one string separated by ,
    if(filters.courses.length > 0){
      httpParams = httpParams.set('attended_courses', filters.courses.join(','));
    }

    //Adds all the skills in one string separated by ,
    if(filters.skills.length > 0){
      httpParams = httpParams.set('skills', filters.skills.join(','));
    }

    return this.http.get<Response>(`${this.baseUrl.replace(`:id`, userId)}`, {params: httpParams}).pipe(
      map((response) => response.rows)
    );
  }
}