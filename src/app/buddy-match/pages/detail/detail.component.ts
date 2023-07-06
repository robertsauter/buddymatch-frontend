import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, first } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  user$!: Observable<User | null>;

  userId!: string;
  accept = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');    
    if(userId) {
      this.userId = userId;
      this.user$ = this.userService.getUserById(userId);
    }

    const accept = this.route.snapshot.queryParamMap.get('accept');
    this.accept = accept === 'true' ? true : false;
  }

  acceptMatch() {
    const loggedUserId = window.localStorage.getItem('userId') || '';

    this.userService.accept(loggedUserId, this.userId).pipe(first()).subscribe(chatId => {
      if(chatId) {
        this.router.navigate(['buddy-match/chat', chatId]);
      }
    });
  }
}
