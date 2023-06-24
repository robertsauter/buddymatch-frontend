import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isStudyFieldsOpen = false;
  isStudyCoursesOpen = false;

  filterOptions = {
    studyFields: [
      {
        name: 'komedia',
        displayName: 'Komedia',
      },
      {
        name: 'info',
        displayName: 'Informatik',
      }
    ]
  };

  constructor(private accountService: AccountService, private router: Router) {}

  logout() {
    this.accountService.logout();
    this.router.navigate(['/buddy-match/login']);
  }
}
