import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/buddy-match/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userId$: BehaviorSubject<string>;

  constructor(private accountService: AccountService, private router: Router) {
    this.userId$ = this.accountService.userId$;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/buddy-match/login']);
  }
}
