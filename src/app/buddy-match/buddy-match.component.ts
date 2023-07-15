import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service'; 
import { User } from './interfaces/user';
import { FiltersModalComponent } from './pages/filters-modal/filters-modal.component';
import { first } from 'rxjs';


@Component({
  selector: 'app-buddy-match',
  templateUrl: './buddy-match.component.html',
  styleUrls: ['./buddy-match.component.css']
})
export class BuddyMatchComponent {
  @ViewChild(FiltersModalComponent) filtersModal!: FiltersModalComponent;
  
  users: User[] = [];
  currentUser: User | undefined;
  currentIndex: number = 0;
  successMessageShown = false;
  noMoreUsersMessageShown = false;

  constructor(private userService: UserService, private accountService: AccountService){}
  

  ngOnInit(): void {
    const lastUser = window.sessionStorage.getItem('lastUser') || '';
    this.loadUsers({ lastUser });
  }

  // Show a message, to indicate, that the matching was successful 
  showSuccessMessage() {
    this.successMessageShown = true;
    setTimeout(() => this.successMessageShown = false, 1500);
  }

  // Show a message, to indicate, that all users were seen
  showNoMoreUsersMessage() {
    this.noMoreUsersMessageShown = true;
    setTimeout(() => this.noMoreUsersMessageShown = false, 1500);
  }

  loadUsers(params: {
    filters?: {
      studyPrograms: string[],
      courses: string[],
      skills: string[]
    },
    lastUser?: string
  }) {
    const id = this.accountService.userId$.value;
    this.userService.getUsers(id, params.filters).pipe(first()).subscribe((users) => {
      this.users = users;
      const lastUserIndex = this.users.findIndex((user) => user._id === params.lastUser);
      this.currentIndex = lastUserIndex && lastUserIndex !== -1 ? lastUserIndex : 0;

      if (users.length > 0) {
        this.currentUser = users[this.currentIndex];
      }
    });
  }

  match() {
    const sender = this.accountService.userId$.value;
    this.userService.match(sender, this.currentUser?._id || '').pipe(first()).subscribe((isSuccess) => {
      if(isSuccess) {
        this.showSuccessMessage();
        this.nextUser();
      }
    });
  }

  nextUser(): void {
    this.currentIndex++;
    if (this.currentIndex < this.users.length) {
      this.currentUser = this.users[this.currentIndex];
    } else {
      this.showNoMoreUsersMessage();
      this.currentIndex = 0;
      this.currentUser = this.users[this.currentIndex];
    }
    window.sessionStorage.setItem('lastUser', this.currentUser._id || '');
  }
}
