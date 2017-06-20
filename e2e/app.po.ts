import { browser, element, by } from 'protractor';

export class OlxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('olx-root h1')).getText();
  }
}
