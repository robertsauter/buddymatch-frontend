import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if(userId) {
      this.user$ = this.userService.getUserById(userId);
    }
  }
}
