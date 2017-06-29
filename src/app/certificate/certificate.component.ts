import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { LanguageService } from '../language.service';

@Component({
  selector: 'olx-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  userPoints;

  @Input()
  maxPoints;

  date = new Date().toDateString();

  text;

  language = 'fi';

  private TEXT_FI = 'Minä katsoin Arjen tietosuojaa -koulutusvideon ja läpäisin nettitestin – oletko jo kokeillut?';
  private TEXT_SV = 'Jag tittade på “Dataskydd i vardagen”- utbildningsvideon och klarade webbtesten – du då?';

  constructor(private languageService: LanguageService) {
  }

  ngOnInit() {
    this.language = this.languageService.getLanguage();
    this.text = encodeURI(this.language === 'sv' ? this.TEXT_SV : this.TEXT_FI);
  }

  print(printSectionId: string) {
    window.print();
  }

}
