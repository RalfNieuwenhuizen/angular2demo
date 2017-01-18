import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <div class="menu">
      <a routerLink="/">Introduction</a>
      <a routerLink="/lists">Lists</a>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  { name = 'Angular'; }
