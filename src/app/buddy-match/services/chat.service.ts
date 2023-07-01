import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  join(name: string) {
    console.log('Try join:', name)
    this.socket.emit('user_join', name);
  }

  sendMessage(message: string) {
    this.socket.emit('chat_message', message);
  }

  receiveMessage(): Observable<{ user: string, message: string }> {
    return this.socket.fromEvent('chat_message');
  }

  //Get all messages for a single chat between two participants
  getMessages() {}
}
