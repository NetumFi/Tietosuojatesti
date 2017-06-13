import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'olx-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  selectedLanguage = 'sv';

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getLanguage();
  }

}
