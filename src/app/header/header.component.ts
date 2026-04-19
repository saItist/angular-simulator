import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  companyName: string = 'Румтибет';

  navLinks: { label: string; path: string }[] = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' },
  ];
  location: string = '';
  date: string = '';
  participants: number | null = null;
  locations: string[] = ['Горы', 'Лес', 'Пустыня', 'Океан'];
  participantOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentMode: 'date' | 'clicker' = 'clicker';
  currentTime: string = '';
  clickCounter: number = 0;
  liveText: string = '';

  constructor() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString('ru-RU');
    }, 1000);
  }

  isFormValid(): boolean {
    return !!this.location && !!this.date && this.participants !== null && this.participants > 0;
  }
}
