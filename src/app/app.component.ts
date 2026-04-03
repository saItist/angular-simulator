import './training';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class AppComponent implements OnInit, OnDestroy {

  companyName: string = 'Румтибет';
  public location: string = '';
  public date: string = '';
  public participants: number | null = null;
  public locations: string[] = ['Горы', 'Лес', 'Пустыня', 'Океан'];
  public participantOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public isLoading: boolean = true;

  public currentMode: 'date' | 'clicker' = 'clicker';
  public currentTime: string = '';
  public clickCounter: number = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;
  public liveText: string = '';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      if (this.currentMode === 'date') {
        this.startDateTimer();
      }
    }, 2000);
  }

  public toggleMode(): void {
    if (this.currentMode === 'date') {
      this.currentMode = 'clicker';
      this.stopDateTimer();
    } else {
      this.currentMode = 'date';
      this.startDateTimer();
    }
  }

  public incrementClickCounter(): void {
    this.clickCounter += 1;
  }

  public decrementClickCounter(): void {
    if (this.clickCounter > 0) {
      this.clickCounter -= 1;
    }
  }

  private startDateTimer(): void {
    this.updateCurrentTime();
    this.timerId = setInterval(() => this.updateCurrentTime(), 1000);
  }

  private stopDateTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentTime = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  ngOnDestroy(): void {
    this.stopDateTimer();
  }

  public isFormValid(): boolean {
    return !!this.location && !!this.date && this.participants !== null && this.participants > 0;
  }

  public searchProgram(): void {
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
      image: 'people-icon.svg'
    },
    { 
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'shield-icon.svg'
    },
    { 
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'label-icon.svg'
    },
  ]
}