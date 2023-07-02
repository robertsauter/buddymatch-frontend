import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatId!: string;

  constructor(private socket: Socket) { }

  connect(chatId: string) {
    this.chatId = chatId;
    this.socket.ioSocket.io.opts.query = { chatId };
    this.socket.connect();
  }

  sendMessage(message: string, senderId: string) {
    this.socket.emit('private message', {
      content: message,
      to: this.chatId,
      senderId: senderId
    });
  }

  receiveMessage(): Observable<{ user: string, message: string }> {
    return this.socket.fromEvent('private message');
  }

  //Get all messages for a single chat between two participants
  getMessages() {}
}
