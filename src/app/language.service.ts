import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  constructor() { }

  getLanguage() {
    return document.location.pathname.split('/')[1] === 'sv' ? 'sv' : 'fi';
  }
}
