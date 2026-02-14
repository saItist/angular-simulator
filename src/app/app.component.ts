import './training';
import { Component, OnInit } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'Р У М Т И Б Е Т';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
  }

  // Сохраняем дату последнего захода
  saveLastVisitDate(): void {
    const formattedDate = new Date().toLocaleString();
    localStorage.setItem('lastVisitDate', formattedDate);
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
  isPrimaryColor(color: string): boolean {
  const upperColor = color.toUpperCase();
  return upperColor === 'RED' || upperColor === 'GREEN' || upperColor === 'BLUE';
  }

  ngOnInit(): void {
    console.log('Visit count:', this.getVisitCount());
    console.log('Last visit:', this.getLastVisitDate());

    // Тест коллекции — города Дагестана
    console.log('--- Collection test ---');

    const numbers = new Collection<number>([1, 2, 3]);
    const names = new Collection<string>(["Abdurahman", "Omar", "AliAskhab"]);
    console.log(numbers.getAll());
    numbers.remove(1);
    console.log(numbers.getAll());
    console.log(names.get(0));
    names.replace(1, "Ahmed");
    console.log(names.getAll());

  }
}