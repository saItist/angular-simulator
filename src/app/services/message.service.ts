import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private nextId: number = 1;

  messages: IMessage[] = [];

  private addMessage(message: Omit<IMessage, 'id'>): void {
    const newMessage: IMessage = { id: this.nextId++, ...message };

    this.messages = [newMessage, ...this.messages].slice(0, 7);
    setTimeout(() => this.closeMessage(newMessage.id), 5000);
  }

  showSuccess(text: string): void {
    this.addMessage({ type: MessageType.SUCCESS, text });
  }

  showInfo(text: string): void {
    this.addMessage({ type: MessageType.INFO, text });
  }

  showWarn(text: string): void {
    this.addMessage({ type: MessageType.WARN, text });
  }

  showError(text: string): void {
    this.addMessage({ type: MessageType.ERROR, text });
  }

  closeMessage(messageId: number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== messageId);
  }

}
