import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'olx-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {}

  nextPage() {
    this.router.navigate(['/tiedot']);
  }

}
