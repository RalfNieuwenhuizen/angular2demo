import { Component, OnInit } from '@angular/core';
import { HNService } from './hn.service';
import { List } from './list';

@Component({
  selector: 'list',
  template: `
      <h2>Lists</h2>
      <div class="menu">
        <select [(ngModel)]="activeList" (change)="pickList()">
            <option *ngFor="let list of lists" [ngValue]="list">{{list.description}}</option>
        </select>
        <button (click)="refresh()">Refresh</button>
      </div>
      <div *ngIf="activeList">
        <h3>{{activeList.description}}</h3>
        <ol *ngIf="activeList.words">
            <li *ngFor="let word of activeList.words">{{word}}</li>
        </ol>
        <p *ngIf="!activeList.words">
            Loading words from HackerNews server...
        </p>
      </div>  
  `,
  providers: [HNService],
})
export class ListComponent implements OnInit {
  constructor(private hnService: HNService) { }

  ngOnInit() {
    this.pickList();
  }

  lists: List[] = [
    {
      value: "wordsFromLast600",
      description: "Top 10 most occurring words in the last 600 stories",
    },
    {
      value: "wordsFromLastWeek",
      description: "Top 10 most occurring words in the posts of exactly the last week",
    },
    {
      value: "wordsFromKarmaUsersTitles",
      description: "Top 10 most occurring words in titles of the last 60 stories of users with at least 10.000 karma",
    },
  ];
  activeList: List = this.lists[0];

  pickList() {
    if (!this.activeList.words)
      this.refresh();
  }

  refresh() {
    console.log("Refresh")
    this.hnService.update(this.activeList);
  }
}
