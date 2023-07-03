import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service'; // Agregado
import { User } from './interfaces/user';

@Component({
  selector: 'app-buddy-match',
  templateUrl: './buddy-match.component.html',
  styleUrls: ['./buddy-match.component.css']
})
export class BuddyMatchComponent {
  @ViewChild('filtersModal') filtersModal!: HTMLDialogElement;

  users: User[] = [];
  currentUser: User | undefined;
  currentIndex: number = 0;

  constructor(private userService: UserService, private accountService: AccountService){}

  ngOnInit(): void {
    let id: string = "";

    if (this.accountService.checkIfUserIsLoggedIn()) {
      id = window.localStorage.getItem('userId') || "";  
    }

    this.userService.getUsers(id, {filter1: 'value1', filter2: 'value2'}).subscribe(users => {
      this.users = users;
      if (users.length > 0) {
        this.currentUser = users[0];
      }
    });
  }

  nextUser(): void {
    this.currentIndex++;
    if (this.currentIndex < this.users.length) {
      this.currentUser = this.users[this.currentIndex];
    } else {
      //What to do when there is no more users
    }
  }
}
