import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../interfaces/IUser';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  imports: [AsyncPipe],
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  protected users$: Observable<IUser[]> = this.userService.users$;

  ngOnInit(): void {
    this.userService.loadUsers();
  }

}
