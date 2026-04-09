import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly _messages: IMessage[] = [];
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly hideDelayMs = 5000;
  private readonly maxMessages = 7;
  private nextId = 1;

  public get messages(): IMessage[] {
    return this._messages;
  }

  public addMessage(message: Omit<IMessage, 'id'>): void {
    const newMessage: IMessage = {
      id: this.nextId++,
      ...message
    };

    this._messages.unshift(newMessage);
    this.scheduleClose(newMessage.id);

    if (this._messages.length > this.maxMessages) {
      const removedMessages = this._messages.splice(this.maxMessages);
      removedMessages.forEach(({ id }) => this.clearTimer(id));
    }
  }

  public closeMessage(messageId: number): void {
    const messageIndex = this._messages.findIndex((message) => message.id === messageId);

    if (messageIndex === -1) {
      return;
    }

    this._messages.splice(messageIndex, 1);
    this.clearTimer(messageId);
  }

  private scheduleClose(messageId: number): void {
    this.clearTimer(messageId);

    const timerId = setTimeout(() => {
      this.closeMessage(messageId);
    }, this.hideDelayMs);

    this.timers.set(messageId, timerId);
  }

  private clearTimer(messageId: number): void {
    const currentTimer = this.timers.get(messageId);

    if (!currentTimer) {
      return;
    }

    clearTimeout(currentTimer);
    this.timers.delete(messageId);
  }
}
