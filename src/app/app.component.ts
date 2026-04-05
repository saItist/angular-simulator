import './training';
import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { IService } from '../interfaces/IService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule, CommonModule],
})

export class AppComponent {

  companyName: string = 'Румтибет';
  location: string = '';
  date: string = '';
  participants: number | null = null;
  locations: string[] = ['Горы', 'Лес', 'Пустыня', 'Океан'];
  participantOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isLoading: boolean = true;

  currentMode: 'date' | 'clicker' = 'clicker';
  currentTime: string = '';
  clickCounter: number = 0;
  liveText: string = '';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
    this.isLoading = false;
    setInterval(() => {
      this.currentTime = new Date().toLocaleString('ru-RU');
    }, 1000);
  }

  toggleMode(mode: 'date' | 'clicker'): void {
    this.currentMode = mode;
  }

  incrementClickCounter(): void {
    this.clickCounter += 1;
  }

  decrementClickCounter(): void {
    if (this.clickCounter > 0) {
      this.clickCounter -= 1;
    }
  }

  isFormValid(): boolean {
    return !!this.location && !!this.date && this.participants !== null && this.participants > 0;
  }

  searchProgram(): void {
    if (this.isFormValid()) {
      console.log('Поиск с параметрами:', {
        location: this.location,
        date: this.date,
        participants: this.participants
      });
    }
  } 

  saveLastVisitDate(): void {
    const formattedDate: string = new Date().toLocaleString();
    localStorage.setItem('last-visit-date', formattedDate);
  }

  incrementVisitCount(): void {
    let count: number = Number(localStorage.getItem('visit-count')) || 0;
    count += 1;
    localStorage.setItem('visit-count', count.toString());
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  services: IService[] = [
    { 
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'people-icon'
    },
    { 
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'shield-icon'
    },
    { 
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'label-icon'
    },
  ]
}