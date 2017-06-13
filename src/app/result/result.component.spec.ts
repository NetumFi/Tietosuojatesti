/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { CertificateComponent } from '../certificate/certificate.component';
import { FooterComponent } from '../footer/footer.component';
import { SummaryComponent } from './summary/summary.component';

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
      declarations: [
        ResultComponent,
        CertificateComponent,
        FooterComponent,
        SummaryComponent
      ],
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

  describe('hasPassed', () => {
    it('should fail with a score below 75', fakeAsync(() => {
      fixture = TestBed.createComponent(ResultComponent);
      component = fixture.componentInstance;
      expect(component.hasPassed(74)).toBeFalsy();
    }));

    it('should pass with a score of 75', fakeAsync(() => {
      fixture = TestBed.createComponent(ResultComponent);
      component = fixture.componentInstance;
      expect(component.hasPassed(75)).toBeTruthy();
    }));
  });

  describe('getPercentage', () => {
    it('8 is 10% of 80', fakeAsync(() => {
      fixture = TestBed.createComponent(ResultComponent);
      component = fixture.componentInstance;
      expect(component.getPercentage(80, 8)).toBe(10);
    }));

    it('Should return infinity if max points is 0', fakeAsync(() => {
      fixture = TestBed.createComponent(ResultComponent);
      component = fixture.componentInstance;
      expect(component.getPercentage(0, 8)).toBe(Infinity);
    }));
  });

});


