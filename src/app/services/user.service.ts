import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { IUser } from '../../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  loadUsers(): void {
    this.loaderService.showLoader();

    this.userApiService.getUsers().pipe(
      tap((users) => this.usersSubject.next(users)),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить список пользователей');
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

}
