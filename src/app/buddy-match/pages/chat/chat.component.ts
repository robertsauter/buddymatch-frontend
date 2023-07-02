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
  userId: string = '';
  message: string = '';

  messages: { sender: string, content: string }[] = [];

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userId') || '';

    this.route.paramMap.subscribe(params => {
      const chatId = params.get('chatId') || '';
      this.chatService.connect(chatId);
    });

    this.chatService.messageReceived$.subscribe((response) => {
      this.messages.push({
        sender: response.from,
        content: response.content
      });
    });

    this.chatService.connected$.subscribe((response) => this.messages = response.messages);
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.userId);
  }
}
