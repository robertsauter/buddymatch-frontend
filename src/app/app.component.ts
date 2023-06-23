import { Component, OnInit } from '@angular/core';
import { AccountService } from './buddy-match/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      if(!isLoggedIn) {
        this.router.navigate(['/buddy-match/login']);
      }
    });
  }
}
