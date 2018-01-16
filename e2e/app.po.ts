import {browser, by, element} from 'protractor';

export class OlxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('olx-root h2')).getText();
  }
}
