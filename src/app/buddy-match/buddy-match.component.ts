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

  constructor(private userService: UserService, private accountService: AccountService){}
  

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(filters?: {
    studyPrograms: string[],
    courses: string[],
    skills: string[]
  }) {
    const id = this.accountService.userId$.value;
    this.userService.getUsers(id, filters).pipe(first()).subscribe((users) => {
      this.users = users;
      this.currentIndex = 0;

      if (users.length > 0) {
        this.currentUser = users[0];
      }
    });
  }

  match() {
    const sender = this.accountService.userId$.value;
    this.userService.match(sender, this.currentUser?._id || '').pipe(first()).subscribe((isSuccess) => {
      if(isSuccess) {
        this.nextUser();
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
