import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, delay, distinctUntilChanged, filter, Observable, switchMap, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { GithubEmoji, SearchService } from './services/search.service';
import { Search } from './components/search/search';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatTableModule, Search],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  searchService = inject(SearchService);
  displayedColumns: string[] = ['name', 'image'];
  dataSource = signal<GithubEmoji[]>([]);
  valueChanges: Observable<string> | undefined;
  isLoading = signal(false);

  ngAfterViewInit() {
    this.valueChanges!
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((searchTerm: string) => searchTerm.length >= 3),
        switchMap((searchTerm: string) => this.fetchData(searchTerm))
      )
      .subscribe(resp => {
        this.dataSource.set(resp);
        this.isLoading.set(false);
      });
  }

  private fetchData(searchTerm: string) {
    return this.searchService.getJsonData(searchTerm)
      .pipe(
        tap(() => this.isLoading.set(true)),
        delay(1000)
      );
  }
}
