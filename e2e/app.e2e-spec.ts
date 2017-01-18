import { Angular2demoPage } from './app.po';

describe('angular2demo App', function() {
  let page: Angular2demoPage;

  beforeEach(() => {
    page = new Angular2demoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
