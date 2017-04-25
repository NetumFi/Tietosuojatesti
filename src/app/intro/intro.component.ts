import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'olx-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  pageNumber: Observable<number>;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.pageNumber = store.select(fromRoot.getPagesState)
      .map(state => state.pageNumber);
  }

  ngOnInit() {}

  nextPage() {
    this.router.navigate(['/tiedot']);
  }

}
