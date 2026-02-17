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
    const formattedDate: string = new Date().toLocaleString();
    localStorage.setItem('last-visit-date', formattedDate);
  }

  incrementVisitCount(): void {
    let count: number = Number(localStorage.getItem('visit-count')) || 0;
    count += 1;
    localStorage.setItem('visit-count', count.toString());
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }
}