import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  partnerName: string = '';
  selfName: string = '';
  message: string = '';

  messages: { user: string, message: string }[] = [];

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.selfName = window.localStorage.getItem('email') || '';
    this.chatService.join(this.selfName);

    this.route.paramMap.subscribe(params => {
      this.partnerName = params.get('userid') || '';
    });

    this.chatService.receiveMessage().subscribe((response) => {
      this.messages.push(response);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
  }
}
