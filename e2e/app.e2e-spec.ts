import { PeoplebookPage } from './app.po';

describe('peoplebook App', function() {
  let page: PeoplebookPage;

  beforeEach(() => {
    page = new PeoplebookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
