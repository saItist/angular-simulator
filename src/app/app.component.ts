import './training';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './components/message/message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MessageComponent],
})
export class AppComponent {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  isLoading: boolean = true;

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
    this.isLoading = false;
  }

  private saveLastVisitDate(): void {
    const formattedDate: string = new Date().toLocaleString();
    this.localStorageService.setItem<string>('last-visit-date', formattedDate);
  }

  private incrementVisitCount(): void {
    const currentCount: number = this.localStorageService.getItem<number>('visit-count') ?? 0;
    this.localStorageService.setItem<number>('visit-count', currentCount + 1);
  }

}
