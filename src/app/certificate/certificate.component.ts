import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user/user.model';

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

  constructor() {
  }

  ngOnInit() {
  }

  print(printSectionId: string) {

    window.print();

  }

}
