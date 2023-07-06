import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  chatPartner$!: Observable<User | null>;

  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  userId: string = '';
  message: string = '';
  messageReceived: boolean = true;

  messages: { sender: string, content: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userId') || '';

    this.route.paramMap.subscribe(params => {
      const chatId = params.get('chatId') || '';
      this.chatService.connect(chatId);
      this.chatService.getMessages(chatId);
    });

    this.chatService.messageReceived$.subscribe((response) => {
      this.messages.push({
        sender: response.from,
        content: response.content
      });
      this.messageReceived = true;
    });

    
    this.chatService.initialMessagesReceived$.subscribe((response) => {
      this.messages = response.messages;

      const partnerId = response.participants.find((participant: string) => participant !== this.userId);
      this.chatPartner$ = this.userService.getUserById(partnerId);
      this.messageReceived = true;
    });
  }

  ngAfterViewChecked(): void {
    if(this.messageReceived) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      this.messageReceived = false;
    }
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.userId);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}
