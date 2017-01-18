import { Component } from '@angular/core';

@Component({
  selector: 'introduction',
  template: `
    <h2>Introduction</h2>
    <p>In this assignment we’ll be asking you to build a small Angular app (or vanilla js / framework of your choice) that talks to a public api of HackerNews. On the following page you’ll find the documentation https://github.com/HackerNews/API. It has two pages.</p>
    <h3>Page 1</h3>
        <p>A page that introduces the app and explains what it does with instructions how to operate it</p>
    <h3>Page 2</h3>
      <p>A page that displays a list (details specified below), a refresh button and a dropdown list.
      The dropdown determines which list will be shown. The options are </p>
        <ul>
          <li>Top 10 most occurring words in the last 600 stories</li>
          <li>Top 10 most occurring words in the post of exactly the last week</li>
          <li>Top 10 most occurring words in titles of the last 60 stories of users with at least 10.000 karma</li>
        </ul>
      <p>When you press the refresh button the app fetches the latest information from the api (don’t reload the page, do this dynamically)
      </p>
  `,
})
export class IntroductionComponent  {}
