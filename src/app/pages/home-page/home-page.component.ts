import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IService } from '../../../interfaces/IService';
import { IBlogPost } from '../../../interfaces/IBlogPost';
import { IPopularTour } from '../../../interfaces/IPopularTour';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [CommonModule],
})
export class HomePageComponent {

  protected messageService: MessageService = inject(MessageService);

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

}
