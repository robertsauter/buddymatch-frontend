import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserByEmail(email: string) {}

  //Get all users, that match the given filter options. Should get the filters as input parameter
  getUsers() {}
}
