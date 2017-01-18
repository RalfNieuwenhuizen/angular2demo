import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { List } from './list';

@Injectable()
export class HNService {
    private hnUrl = 'https://hacker-news.firebaseio.com/v0';  // URL to web API

    constructor (private http: Http) {}

    stories: Object[] = [];

    getStory (storyId: string) : Observable<string> {
        var obs = this.http.get(this.hnUrl + `/item/${storyId}.json`)
            .map(this.extractData)
            .catch(this.handleError);

        return obs;
    }

    // Top 10 most occurring words in the last 600 stories
    wordsFromLast600: string[];
    getWordsFromLast600 (list: List = null): Observable<string> {
        var obs = this.http.get(this.hnUrl + '/newstories.json')
                        .map(this.extractData)
                        .catch(this.handleError);

        var hnService = this;
        obs.subscribe(function (result) {
            result.forEach(function (storyId: string) {
                hnService.getStory(storyId).subscribe(function (story) {
                    hnService.stories[storyId] = story;
                })
            })
            hnService.wordsFromLast600 = result;
            if (list)
                list.words = hnService.wordsFromLast600;
        });

        return obs;
    }

    // Top 10 most occurring words in the posts of exactly the last week
    wordsFromLastWeek: string[];
    getWordsFromLastWeek (list: List = null): Observable<string> {
        var obs = this.http.get(this.hnUrl + '/newstories.json')
                        .map(this.extractData)
                        .catch(this.handleError);

        obs.subscribe(function (result) {
            this.wordsFromLastWeek = result;
            if (list)
                list.words = this.wordsFromLastWeek;
        });

        return obs;
    }

    // Top 10 most occurring words in titles of the last 60 stories of users with at least 10.000 karma
    wordsFromKarmaUsersTitles: string[];
    getWordsFromKarmaUsersTitles (list: List = null): Observable<string> {
        var obs = this.http.get(this.hnUrl + '/newstories.json')
                        .map(this.extractData)
                        .catch(this.handleError);

        obs.subscribe(function (result) {
            this.wordsFromKarmaUsersTitles = result;
            if (list)
                list.words = this.wordsFromKarmaUsersTitles;
        });

        return obs;
    }

    update (list: List): void {
        switch (list.value) {
            case 'wordsFromLast600':
                this.getWordsFromLast600(list);
            case 'wordsFromLastWeek':
                this.getWordsFromLastWeek(list);
            case 'wordsFromKarmaUsersTitles':
                this.getWordsFromKarmaUsersTitles(list);
        }
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}