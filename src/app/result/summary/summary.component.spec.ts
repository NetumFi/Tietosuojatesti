import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from '../../language.service';

// FIXME: duplicate to result component test. Extract
class MockStore {
  userPoints;
  dispatch = jasmine.createSpy('dispatch');
  select = jasmine.createSpy('select')
    .and.callFake(() => Observable.of(
      {
        user: {name: 'John Doe', title: 'Reporter', organization: ''},
        points: this.userPoints,
        maxPoints: 100
      }
    ));
}

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent ],
      providers: [
        LanguageService,
        {
          provide: Store,
          useValue: new MockStore()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
