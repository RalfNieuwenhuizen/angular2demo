import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ListComponent }  from './list.component';
import { IntroductionComponent }  from './introduction.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/introduction',
        pathMatch: 'full'
      },
      {
        path: 'introduction',
        component: IntroductionComponent
      },
      {
        path: 'lists',
        component: ListComponent
      },
    ]),
    HttpModule,
    JsonpModule
  ],
  declarations: [ AppComponent, ListComponent, IntroductionComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


