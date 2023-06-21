import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  sendMessage(message: string) {}

  //Get all messages for a single chat between two participants
  getMessages() {}
}
