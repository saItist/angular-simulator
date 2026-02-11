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

  // Пункт 3 — дата последнего захода
  saveLastVisitDate(): void {
    const currentDate = new Date().toISOString();
    localStorage.setItem('lastVisitDate', currentDate);
  }

  getLastVisitDate(): string | null {
    return localStorage.getItem('lastVisitDate');
  }

  // Пункт 4 — счётчик посещений
  incrementVisitCount(): void {
    let count = Number(localStorage.getItem('visitCount')) || 0;
    count += 1;
    localStorage.setItem('visitCount', count.toString());
  }

  getVisitCount(): number {
    return Number(localStorage.getItem('visitCount')) || 0;
  }

  // Пункт 2 — проверка основного цвета
  isPrimaryColor(color: string): boolean {
  return Object.values(Color).includes(color as any);
}

  // Тест коллекции городов Дагестана (теперь внутри метода)
  ngOnInit(): void {
    console.log('Количество заходов:', this.getVisitCount());
    console.log('Последний заход:', this.getLastVisitDate());

    // Демонстрация коллекции городов Дагестана
    const dagestanCities = new Collection<string>([
      'Махачкала',
      'Дербент',
      'Каспийск',
      'Хасавюрт',
      'Кизляр',
      'Избербаш',
      'Кизилюрт',
      'Буйнакск',
      'Дагестанские Огни',
      'Южно-Сухокумск'
    ]);

    console.log('Все города Дагестана:', dagestanCities.getAll());

    console.log('Город под индексом 1:', dagestanCities.getByIndex(1));
    console.log('Город под индексом 7:', dagestanCities.getByIndex(7));

    dagestanCities.replaceAtIndex(2, 'Сергокала');
    console.log('После замены:', dagestanCities.getAll());

    dagestanCities.removeByIndex(5);
    console.log('После удаления:', dagestanCities.getAll());

    dagestanCities.clear();
    console.log('После очистки, размер коллекции:', dagestanCities.size);

    dagestanCities.add('Гуниб');
    dagestanCities.add('Хив');
    console.log('Новые города после добавления:', dagestanCities.getAll());
  }
}