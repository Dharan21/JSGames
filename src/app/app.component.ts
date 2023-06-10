import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Games';
  isOpen = false;

  games: string[] = [
    'snacks'
  ];

  constructor(
    private router: Router
  ) {

  }

  onGameChange(val: string) {
    if (val == '-1') val = '';
    this.router.navigate([val]);
  }
}
