import { Component, OnInit, signal, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit, OnDestroy {
  @Output() searchControlValue = new EventEmitter();

  searchControl = new FormControl();
  destroyed$ = new Subject();

  ngOnInit() {
    this.searchControlValue.emit(this.searchControl.valueChanges)
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(1);
    this.destroyed$.complete();
  }
}
