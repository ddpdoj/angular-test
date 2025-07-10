import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay, of, switchMap, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { GithubEmoji, SearchService } from './services/search.service';
import { Search } from './components/search/search';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatTableModule, Search],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  dataSource = signal<GithubEmoji[]>([]);
  displayedColumns: string[] = ['name', 'image'];
  isLoading = signal(false);
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);

  ngOnInit() {
    this.route.queryParams
      .pipe(switchMap(params => this.fetchData(params['q'])))
      .subscribe(resp => {
        this.dataSource.set(resp);
        this.isLoading.set(false);
      });
  }

  private fetchData(searchTerm: string) {
    if (searchTerm?.length < 3) return of([]);

    return this.searchService.getJsonData(searchTerm)
      .pipe(
        tap(() => this.isLoading.set(true)),
        delay(1000)
      );
  }
}
