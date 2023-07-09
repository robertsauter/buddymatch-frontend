import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, catchError, map, of } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'environment';
import { User } from '../interfaces/user';
import { Response } from '../interfaces/response';
import { UserService } from './user.service';
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatId!: string;

  initialMessagesReceived$: Observable<Chat> = this.socket.fromEvent('initial messages');
  messageReceived$: Observable<{ content: string, from: string }> = this.socket.fromEvent('private message');

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private accountService: AccountService,
    private userService: UserService
  ) { }

  connect(chatId: string) {
    this.chatId = chatId;
    this.socket.ioSocket.io.opts.query = { chatId };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  getMessages(chatId: string) {
    this.socket.emit('initial messages', chatId);
  }

  sendMessage(message: string, senderId: string) {
    this.socket.emit('private message', {
      content: message,
      to: this.chatId,
      senderId: senderId
    });
  }

  getChats(userId: string): Observable<{ chat: Chat; lastMessage: string; user$: Observable<User | null> }[] | null> {
    return this.http.get<Response>(`${environment.baseUrl}/list/chats/${userId}`).pipe(
      map((response) => {
        const chats: { chat: Chat; lastMessage: string; user$: Observable<User | null> }[] = [];

        response.rows.forEach((chat: Chat) => {
          const partnerId = chat.participants.find((id: string) => id !== userId) || '';
          const user$ = this.userService.getUserById(partnerId);
          const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : '';

          chats.push({
            chat,
            lastMessage,
            user$
          });
        });
        return chats;
      }),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403) {
          this.accountService.logout();
        }
        return of(null);
      })
    );
  }
}
