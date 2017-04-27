/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IntroComponent } from './intro.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ IntroComponent ],
      providers: [
        {
          provide: Store,
          useClass: class { select = jasmine.createSpy('select').and.callFake(() => Observable.of({ pageNumber: 1 })); }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click Next page button', fakeAsync(() => {
    spyOn(component, 'nextPage');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  }));
});
