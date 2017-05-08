import { OlxDateFormatPipe } from './olx-date-format.pipe';

describe('OlxDateFormatPipe', () => {
  let pipe;

  beforeAll( () => {
    pipe = new OlxDateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('normal case', () => {
    expect(pipe.transform('2017-01-01')).toBe('1.1.2017');
  });

  it('number as an input', () => {
    expect(pipe.transform(12)).toBe('');
  });

  it('array as an input ', () => {
    expect(pipe.transform([])).toBe('');
  });

  it('null and undefined as an input ', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
