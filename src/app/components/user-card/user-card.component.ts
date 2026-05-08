import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;

  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
