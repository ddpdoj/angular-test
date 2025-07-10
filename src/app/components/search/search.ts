import { Component, OnInit, OnDestroy, inject, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  searchControl = new FormControl('' as any,[Validators.minLength(3)]);
  private destroyed$ = new Subject();

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300),
        distinctUntilChanged(),
        tap((searchTerm: string) => {
          if (searchTerm) this.router.navigate(['/'], { queryParams: { q: searchTerm } });
          else this.router.navigate(['/']);
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    const initialQuery = this.route.snapshot.queryParamMap.get('q');
    this.searchControl.setValue(initialQuery);
  }

  clearInput(event: Event) {
    event.preventDefault(); //page is refreshing on clear for some reason???
    this.searchControl.setValue('');
  }

  ngOnDestroy() {
    this.destroyed$.next(1);
    this.destroyed$.complete();
  }
}
