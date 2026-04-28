import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private nextId: number = 1;

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(message: Omit<IMessage, 'id'>): void {
    const newMessage: IMessage = { id: this.nextId++, ...message };
    const updated: IMessage[] = [newMessage, ...this.messagesSubject.getValue()].slice(0, 7);

    this.messagesSubject.next(updated);
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
    const updated: IMessage[] = this.messagesSubject.getValue().filter((m: IMessage) => m.id !== messageId);

    this.messagesSubject.next(updated);
  }

}
