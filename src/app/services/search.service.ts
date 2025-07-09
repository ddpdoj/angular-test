import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface GithubEmoji {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private http = inject(HttpClient)

  getJsonData(searchValue: string): Observable<GithubEmoji[]> {
    return this.http.get('data.json').pipe(
      map((resp: any) => Object.keys(resp)
        .filter((key: string) => key.toLowerCase().includes(searchValue.toLowerCase()))
        .map((key: string) => ({ name: key, image: resp[key] })))
    );
  }
}
