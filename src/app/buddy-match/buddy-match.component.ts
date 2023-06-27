import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
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

  constructor(private userService: UserService){}

  ngOnInit(): void {
    //used dummy values in the params cause still don't know how to get the userId
    this.userService.getUsers('userId', {filter1: 'value1', filter2: 'value2'}).subscribe(users => {
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

