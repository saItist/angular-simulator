import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  imports: [AsyncPipe],
})
export class LoaderComponent {

  protected loaderService: LoaderService = inject(LoaderService);

}
