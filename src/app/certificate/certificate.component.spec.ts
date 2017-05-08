import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateComponent } from './certificate.component';
import { OlxDateFormatPipe } from '../olx-date-format.pipe';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateComponent, OlxDateFormatPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;
    component.user = { name: 'John Doe', title: 'Reporter', organization: 'Dantes' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
