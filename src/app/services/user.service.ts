import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { IUser } from '../../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

const USERS_STORAGE_KEY = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  loadUsers(): void {
    const cached: IUser[] | null = this.localStorageService.getItem<IUser[]>(USERS_STORAGE_KEY);

    if (cached) {
      this.usersSubject.next(cached);
      return;
    }

    this.loaderService.showLoader();

    this.userApiService.getUsers().pipe(
      catchError(() => {
        this.messageService.showError('Не удалось загрузить список пользователей');
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe((users: IUser[]) => {
      this.usersSubject.next(users);
      this.localStorageService.setItem<IUser[]>(USERS_STORAGE_KEY, users);
    });
  }

  addUser(user: IUser): void {
    const updated: IUser[] = [user, ...this.usersSubject.getValue()];
    this.usersSubject.next(updated);
    this.localStorageService.setItem<IUser[]>(USERS_STORAGE_KEY, updated);
  }

  deleteUser(id: number): void {
    const updated: IUser[] = this.usersSubject.getValue().filter((u: IUser) => u.id !== id);
    this.usersSubject.next(updated);
    this.localStorageService.setItem<IUser[]>(USERS_STORAGE_KEY, updated);
  }

}
