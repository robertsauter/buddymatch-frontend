import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches$!: Observable<Observable<User | null>[] | null>;
  chats$!: Observable<{ chat: Chat; lastMessage: string; user$: Observable<User | null> }[] | null>;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.matches$ = this.userService.getMatches(this.accountService.userId$.value);
    this.chats$ = this.chatService.getChats(this.accountService.userId$.value);
  }
}
