/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { CertificateComponent } from '../certificate/certificate.component';
import { OlxDateFormatPipe } from '../olx-date-format.pipe';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let mockStore: MockStore;

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


  beforeEach(async(() => {
    mockStore = new MockStore();
    mockStore.userPoints = 74;
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ResultComponent, CertificateComponent, OlxDateFormatPipe ],
      providers: [
        {
          provide: Store,
          useValue: mockStore
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click Back to beginning button', fakeAsync(() => {
    spyOn(component, 'backToBeginning');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.backToBeginning).toHaveBeenCalled();
  }));

  it('should tell the user to try again', fakeAsync(() => {
    expect(fixture.debugElement.query(By.css('div')).nativeElement.textContent)
      .toContain('Testituloksesi 74 / 100 pistettä ei valitettavasti riittänyt');
  }));

  it('should congratulate the user', fakeAsync(() => {
    mockStore.userPoints = 75;
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div')).nativeElement.textContent)
      .toContain('Onneksi olkoon John Doe, sait 75 / 100');
  }));

});
