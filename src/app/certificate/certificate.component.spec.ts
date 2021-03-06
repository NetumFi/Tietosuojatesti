import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateComponent } from './certificate.component';
import { FooterComponent } from '../footer/footer.component';
import { LanguageService } from '../language.service';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CertificateComponent,
        FooterComponent
      ],
      providers: [LanguageService]
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
