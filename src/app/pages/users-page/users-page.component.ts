import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  imports: [AsyncPipe],
})
export class UsersPageComponent implements OnInit {

  protected userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.loadUsers().subscribe((users) => {
      this.userService.setUsers(users);
    });
  }

}
