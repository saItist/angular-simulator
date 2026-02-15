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
  companyName: string = 'Румтибет';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
  }

  saveLastVisitDate(): void {
    const formattedDate = new Date().toLocaleString();
    localStorage.setItem('lastVisitDate', formattedDate);
  }

  incrementVisitCount(): void {
    let count = Number(localStorage.getItem('visitCount')) || 0;
    count += 1;
    localStorage.setItem('visitCount', count.toString());
  }

  isPrimaryColor(color: Color): boolean {
    return Object.values(Color).includes(color);
  }
}