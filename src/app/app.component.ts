import './training';
import { Component, OnInit } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  companyName: string = 'Р У М Т И Б Е Т';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
  }

  // Сохраняем дату последнего захода
  saveLastVisitDate(): void {
    const currentDate = new Date();
    const dateString = currentDate.toISOString();
    localStorage.setItem('lastVisitDate', dateString);
  }

  getLastVisitDate(): string | null {
    return localStorage.getItem('lastVisitDate');
  }

  //Счётчик заходов
  incrementVisitCount(): void {
    let count = 0;
    const previousCount = localStorage.getItem('visitCount');
    if (previousCount !== null) {
      count = Number(previousCount);
    }
    count += 1;
    localStorage.setItem('visitCount', count.toString());
  }

  getVisitCount(): number {
    const storedValue = localStorage.getItem('visitCount');
    if (storedValue !== null) {
      return Number(storedValue);
    }
    return 0;
  }
  // Проверка цвета
  isPrimaryColor(color: string): boolean {
    if (color === Color.Red || color === Color.Green || color === Color.Blue) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    console.log('Visit count:', this.getVisitCount());
    console.log('Last visit:', this.getLastVisitDate());

    // Тест коллекции — города Дагестана
    console.log('--- Collection test ---');

    const cities = new Collection<string>();
    cities.add('Махачкала');
    cities.add('Дербент');
    console.log('Added 2 cities:', cities.getAll());

    cities.add('Каспийск');
    console.log('Added one more:', cities.getAll());

    cities.replaceAtIndex(0, 'Кизляр');
    console.log('Replaced first:', cities.getAll());

    cities.removeByIndex(1);
    console.log('Removed second:', cities.getAll());

    cities.clear();
    console.log('Cleared:', cities.getAll());
  }
}