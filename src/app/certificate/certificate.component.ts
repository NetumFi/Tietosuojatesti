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
    const innerContents = document.getElementById(printSectionId).innerHTML;
    const popupWindow = window
      .open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWindow.document.open();
    popupWindow.document
      .write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">'
        + innerContents
        + '</html>');
    popupWindow.document.close();
  }

}
