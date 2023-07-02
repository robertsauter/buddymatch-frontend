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
    this.selfName = window.localStorage.getItem('userId') || '';
    this.chatService.connect('64a1a17d3bb2df85efa30d9a');

    this.route.paramMap.subscribe(params => {
      this.partnerName = params.get('userId') || '';
    });

    this.chatService.receiveMessage().subscribe((response) => {
      console.log(response);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.selfName);
  }
}
