import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches$!: Observable<Observable<User | null>[] | null>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = window.localStorage.getItem('userId') || '';
    this.matches$ = this.userService.getMatches(userId);
  }
}
