import { Injectable } from '@angular/core';
import { UserDetail } from '../interfaces/user-detail';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  login(username: string, password: string) {}

  register(user: User) {}

  updateProfile(user: UserDetail) {}
}
