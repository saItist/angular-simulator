import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent implements OnInit {

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  protected searchControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value: string) => {
      this.filterChange.emit(value);
    });
  }

}
