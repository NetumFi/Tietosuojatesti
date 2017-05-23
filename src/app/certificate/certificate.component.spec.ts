import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateComponent } from './certificate.component';
import { ShareButtonDirective, ShareButtonsService } from 'ng2-sharebuttons';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateComponent, ShareButtonDirective ],
      providers: [
        { provide: ShareButtonsService, useValue: {
          validateUrl: function() {}
        } }
        ]
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
