import { TestBed, inject } from '@angular/core/testing';

import { SturepeatService } from './sturepeat.service';

describe('SturepeatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SturepeatService]
    });
  });

  it('should be created', inject([SturepeatService], (service: SturepeatService) => {
    expect(service).toBeTruthy();
  }));
});
