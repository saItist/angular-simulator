import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [NgClass],
})
export class MessageComponent {
  protected messageService: MessageService = inject(MessageService);

  closeMessage(messageId: number): void {
    this.messageService.closeMessage(messageId);
  }
}
