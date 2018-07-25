import { TestBed, inject } from '@angular/core/testing';

import { StusubjectService } from './stusubject.service';

describe('StusubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StusubjectService]
    });
  });

  it('should be created', inject([StusubjectService], (service: StusubjectService) => {
    expect(service).toBeTruthy();
  }));
});
