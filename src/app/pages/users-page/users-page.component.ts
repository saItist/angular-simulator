import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  protected filteredUsers$: Observable<IUser[]> = combineLatest([
    this.userService.users$,
    this.filterSubject.asObservable(),
  ]).pipe(
    map(([users, filter]: [IUser[], string]) => {
      const trimmed: string = filter.trim().toLowerCase();
      return trimmed ? users.filter((u: IUser) => u.name.toLowerCase().includes(trimmed)) : users;
    }),
    takeUntilDestroyed(this.destroyRef)
  );

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  onFilterChange(value: string): void {
    this.filterSubject.next(value);
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

}
