import { OlxPage } from './app.po';

describe('olx App', function() {
  let page: OlxPage;

  beforeEach(() => {
    page = new OlxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('JUHTA');
  });
});
