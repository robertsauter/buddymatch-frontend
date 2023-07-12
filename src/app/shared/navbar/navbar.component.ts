import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/buddy-match/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userId$: BehaviorSubject<string>;

  constructor(private accountService: AccountService) {
    this.userId$ = this.accountService.userId$;
  }
}
