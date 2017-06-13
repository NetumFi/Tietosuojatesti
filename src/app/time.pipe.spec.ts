import { TimePipe } from './time.pipe';
import { LanguageService } from './language.service';
import { TestBed } from '@angular/core/testing';

describe('TimePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });

  });
  const pipe = new TimePipe();

  it('transforms 600 seconds to "10 minuuttia "', () => {
    expect(pipe.transform(600)).toBe('10 minuuttia ');
  });

  it('transforms 60 seconds to "1 minuutti "', () => {
    expect(pipe.transform(60)).toBe('1 minuutti ');
  });

  it('transforms 61 seconds to "1 minuutti 1 sekunti"', () => {
    expect(pipe.transform(61)).toBe('1 minuutti 1 sekunti ');
  });

  it('transforms 62 seconds to "1 minuutti 2 sekuntia "', () => {
    expect(pipe.transform(62)).toBe('1 minuutti 2 sekuntia ');
  });

});
