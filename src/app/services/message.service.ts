import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private nextId = 1;

  messages: IMessage[] = [];

  addMessage(message: Omit<IMessage, 'id'>): void {
    const newMessage: IMessage = { id: this.nextId++, ...message };

    this.messages = [newMessage, ...this.messages].slice(0, 7);
    setTimeout(() => this.closeMessage(newMessage.id), 5000);
  }

  closeMessage(messageId: number): void {
    this.messages = this.messages.filter(({ id }) => id !== messageId);
  }
}
