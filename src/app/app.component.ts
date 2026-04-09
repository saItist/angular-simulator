import './training';
import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { MessageType } from '../enums/MessageType';
import { IService } from '../interfaces/IService';
import { IMessage } from '../interfaces/IMessage';
import { IBlogPost } from '../interfaces/IBlogPost';
import { IPopularTour } from '../interfaces/IPopularTour';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from './services/message.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule, CommonModule],
})

export class AppComponent {

  private readonly storageService: StorageService = inject(StorageService);
  private readonly messageService: MessageService = inject(MessageService);

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

  readonly messageIconPath: string = '/images/icons/message-icon.svg';
  readonly closeIconPath: string = '/images/icons/close-btn-icon.svg';
  messages: IMessage[] = this.messageService.messages;

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
    }
  ];

  popularTours: IPopularTour[] = [
    {
      id: 1,
      image: 'lake-mountain',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      rating: 4.9,
      price: 480
    },
    {
      id: 2,
      image: 'night-in-mountains',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      rating: 4.5,
      price: 500
    },
    {
      id: 3,
      image: 'stretching-mountain',
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      rating: 5.0,
      price: 230
    }
  ];

  blogPosts: IBlogPost[] = [
    {
      id: 1,
      positionClass: 'blog-card-top-left',
      image: 'italy-city',
      alt: 'Город в горах',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      linkText: 'читать статью'
    },
    {
      id: 2,
      positionClass: 'blog-card-top-right',
      image: 'ocean-flight',
      alt: 'Море с самолёта',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает соответствующие условия реализации, независимые способы реализации соответствующих...',
      date: '01/04/2023',
      linkText: 'читать статью'
    },
    {
      id: 3,
      positionClass: 'blog-card-bottom-left',
      image: 'street-walker',
      alt: 'Человек идёт по улице',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      linkText: 'читать статью'
    },
    {
      id: 4,
      positionClass: 'blog-card-bottom-right',
      image: 'taj-mahal',
      alt: 'Мечеть в Индии',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      linkText: 'читать статью'
    }
  ];

  private clockIntervalId!: ReturnType<typeof setInterval>;

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCount();
    this.isLoading = false;
    this.clockIntervalId = setInterval(() => {
      this.currentTime = new Date().toLocaleString('ru-RU');
    }, 1000);
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

  showTourProgramMessage(): void {
    this.messageService.addMessage({
      type: MessageType.WARN,
      text: 'Программа недоступна'
    });
  }

  showProgramPriceMessage(): void {
    this.messageService.addMessage({
      type: MessageType.INFO,
      text: 'Стоимость отправлена на почту'
    });
  }

  showRatingMessage(): void {
    this.messageService.addMessage({
      type: MessageType.SUCCESS,
      text: 'Направления получены'
    });
  }

  showBlogMaterialsMessage(): void {
    this.messageService.addMessage({
      type: MessageType.ERROR,
      text: 'Материалы недоступны'
    });
  }

  closeMessage(messageId: number): void {
    this.messageService.closeMessage(messageId);
  }

  private saveLastVisitDate(): void {
    const formattedDate: string = new Date().toLocaleString();
    this.storageService.setItem<string>('last-visit-date', formattedDate);
  }

  private incrementVisitCount(): void {
    const currentCount: number = this.storageService.getItem<number>('visit-count') ?? 0;
    this.storageService.setItem<number>('visit-count', currentCount + 1);
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

}