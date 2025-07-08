import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from './components/search/search';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-test';
}
