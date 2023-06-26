import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Observable, first } from 'rxjs';
import { ResponseData } from '../../interfaces/responseData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  response$!: Observable<ResponseData<null>>;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  tryLogin() {
    this.response$ = this.accountService.login(this.email, this.password);
    this.response$.pipe(first()).subscribe((response) => {
      if(response.isSuccess) {
        this.router.navigate(['/buddy-match']);
      }
    });
  }
}
