import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean = false;

  email: string = '';
  password: string = '';

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  tryLogin() {
    this.accountService.login(this.email, this.password)
      .pipe(first())
      .subscribe({
        next: () => this.router.navigate(['/buddy-match']),
        error: () => this.error = true
      });
  }
}
