import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service'; 
import { User } from './interfaces/user';
import { FiltersModalComponent } from './pages/filters-modal/filters-modal.component';


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
    let id: string = "";

    if (this.accountService.checkIfUserIsLoggedIn()) {
      id = window.localStorage.getItem('userId') || "";
    }

    this.filtersModal.filtersSaved.subscribe(filters => {
      this.userService.getUsers(id, filters).subscribe(users => {
        this.users = users;
        if (users.length > 0) {
          this.currentUser = users[0];
        }
      });
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
